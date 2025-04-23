from fastapi import FastAPI

app = FastAPI()

#httpメソッド：get
@app.get("/")
async def read_root():
    return {"Hello": "World"}


