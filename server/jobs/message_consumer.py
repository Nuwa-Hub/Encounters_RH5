from server.jobs import consumer
from server.models import verification
import asyncio
                
def consume_messages(killer):
    for message in consumer:
        if killer.is_set():
            print('Killing consumer')
            return
        user_id = message.value['user_id']
        meeting_id = message.value['meeting_id']
        print(f"User {user_id} has a new meeting {meeting_id}")
        result = verification.creating_verification(user_id, meeting_id)
        consumer.commit()