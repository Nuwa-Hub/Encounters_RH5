from pymongo import MongoClient
import motor.motor_asyncio

from server import conf

async_client = MongoClient(conf.mongod_db_connection_string)

client = motor.motor_asyncio.AsyncIOMotorClient(conf.mongod_db_connection_string)