from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime
from .database import SessionLocal
from . import crud

def deactivate_old_users_job():
    db = SessionLocal()
    try:
        crud.deactivate_old_users(db)
        print(f"{datetime.now()}: 古いユーザーを無効化しました。")
    finally:
        db.close()

def start_scheduler():
    scheduler = BackgroundScheduler()
    scheduler.add_job(deactivate_old_users_job, CronTrigger(month=4, day=1, hour=0, minute=0))
    scheduler.start()

