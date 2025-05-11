from fastapi import Depends, FastAPI, HTTPException, Query, Response, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError #追加
from typing import List, Optional
from datetime import timedelta

from . import crud, models, schemas, scheduler
from .database import engine, get_db
from .utils import get_current_user, create_access_token, get_current_admin_user


# データベーステーブルの作成
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# スケジューラを起動
scheduler.start_scheduler()

#httpメソッド：get（ルートエンドポイント）
@app.get("/")
async def read_root():
    return {"Hello": "World"}

# データベース接続テスト
@app.get("/test-db")
def test_db(db: Session = Depends(get_db)):
    try:
        result = db.execute("SELECT 1").fetchone()
        if result:
            return {"message": "データベース接続成功！", "result": result[0]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"データベース接続エラー: {str(e)}")

# ログイン，ログアウトのエンドポイント
@app.post("/login")
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = crud.authenticate_user(db, user.email, user.password)
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    
    access_token = create_access_token(data={"sub": str(db_user.id)})
    
    response = JSONResponse(content={"message": "Login successful"})
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=False,  # 本番はTrue（HTTPS必須）
        samesite="Lax",
        max_age=60 * 60,
    )
# secure=False：HTTPでもHTTPSでもクッキーが送信される（開発環境向け）
# secure=True：HTTPS通信時のみクッキーがブラウザに送られる（本番環境向け）
    
    return response

@app.post("/logout")
def logout(current_user: models.User = Depends(get_current_user)):
    response = JSONResponse(content={"message": "Logged out"})
    response.delete_cookie("access_token")
    return response

# ユーザー関連のエンドポイント
@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    return crud.create_user(db=db, user=user)

@app.get("/users/", response_model=List[schemas.User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users

@app.get("/users/{user_id}", response_model=schemas.User)
def read_user(user_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@app.put("/users/{user_id}", response_model=schemas.User)
def update_user(user_id: int, user: schemas.UserUpdate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    # 自分自身 or 管理者かチェック
    if current_user.id != user_id and not current_user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Permission denied: only self or admin can update user info"
        )
    db_user = crud.update_user(db, user_id=user_id, user=user)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@app.delete("/users/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db), current_admin: models.User = Depends(get_current_admin_user)):
    success = crud.delete_user(db, user_id=user_id)
    if not success:
        raise HTTPException(status_code=404, detail="User not found")
    return {"message": "User successfully deleted"}

# カテゴリ関連のエンドポイント
@app.post("/categories/", response_model=schemas.Category)
def create_category(category: schemas.CategoryCreate, db: Session = Depends(get_db)
                    # current_admin: models.User = Depends(get_current_admin_user)
                    ):
    try:
        return crud.create_category(db=db, category=category)
    except IntegrityError as e:
        error_str = str(e)
        if "Duplicate entry" in error_str and "category.name" in error_str:
            raise HTTPException(
                status_code=400,
                detail="このカテゴリー名は既に使用されています。別の名前を選択してください。"
            )
        raise HTTPException(status_code=400, detail=f"データベースエラーが発生しました: {error_str}")
    except Exception as e:
        print(f"予期しないエラー: {str(e)}")  # サーバーログにエラーを出力
        raise HTTPException(status_code=500, detail=f"予期しないエラーが発生しました: {str(e)}")

@app.get("/categories/", response_model=List[schemas.Category])
def read_categories(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), 
                    # current_user: models.User = Depends(get_current_user)
                    ):
    categories = crud.get_categories(db, skip=skip, limit=limit)
    return categories

@app.get("/categories/{category_id}", response_model=schemas.Category)
def read_category(category_id: int, db: Session = Depends(get_db),
                #   current_user: models.User = Depends(get_current_user)
                  ):
    db_category = crud.get_category(db, category_id=category_id)
    if db_category is None:
        raise HTTPException(status_code=404, detail="Category not found")
    return db_category

# アイテム関連のエンドポイント
@app.post("/items/", response_model=schemas.Item)
def create_item(item: schemas.ItemCreate, db: Session = Depends(get_db), 
                # current_admin: models.User = Depends(get_current_admin_user)
                ):
    return crud.create_item(db=db, item=item)

@app.put("/items/{item_id}", response_model=schemas.Item)
def update_item(item_id: int, item: schemas.ItemUpdate, db: Session = Depends(get_db)):
    db_item = crud.update_item(db, item_id=item_id, item=item)
    if db_item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return db_item

@app.get("/items/", response_model=List[schemas.Item])
def read_items(
    skip: int = 0, 
    limit: int = 100, 
    category_id: Optional[int] = None,
    name: Optional[str] = None,
    location: Optional[str] = None,
    is_available: Optional[bool] = None,
    sort_by: Optional[str] = None,
    sort_order: Optional[str] = "asc",
    db: Session = Depends(get_db),
):
    items = crud.get_items(db, skip=skip, limit=limit, category_id=category_id, name=name, location=location, is_available=is_available, sort_by=sort_by, sort_order=sort_order,)
    return items

@app.get("/items/{item_id}", response_model=schemas.Item)
def read_item(item_id: int, db: Session = Depends(get_db),
            #   current_user: models.User = Depends(get_current_user)
              ):
    db_item = crud.get_item(db, item_id=item_id)
    if db_item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return db_item

# トランザクション関連のエンドポイント
@app.post("/transactions/", response_model=schemas.ItemTransaction)
def create_transaction(transaction: schemas.ItemTransactionCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    return crud.create_transaction(db=db, transaction=transaction)

@app.get("/transactions/", response_model=List[schemas.ItemTransaction])
def read_transactions(
    skip: int = 0, 
    limit: int = 100, 
    user_id: Optional[int] = None,
    item_id: Optional[int] = None,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    transactions = crud.get_transactions(db, skip=skip, limit=limit, user_id=user_id, item_id=item_id)
    return transactions

@app.get("/transactions/{transaction_id}", response_model=schemas.ItemTransaction)
def read_transaction(transaction_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    db_transaction = crud.get_transaction(db, transaction_id=transaction_id)
    if db_transaction is None:
        raise HTTPException(status_code=404, detail="Transaction not found")
    return db_transaction

# 検索ログ作成エンドポイント
@app.post("/search-logs/", response_model=schemas.SearchLog)
def create_search_log(search_log: schemas.SearchLogCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    return crud.create_search_log(db=db, search_log=search_log)

