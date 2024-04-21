from kafka import KafkaConsumer
from json import loads
from server import conf 


consumer = KafkaConsumer(conf.NOTIFICATIONS_TOPIC, 
                         auto_offset_reset='earliest',
                         enable_auto_commit=False,
                         group_id='my-group',
                         value_deserializer=lambda x: loads(x.decode('utf-8')))
