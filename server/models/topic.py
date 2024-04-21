# from typing import Any, Optional

# from server.models import client, async_client


# def creating_topic(meet_id, user_id, timestamp):
#     document = {
#         "meet_id": meet_id,
#         "user_id": user_id,
#         "timestamp": timestamp,
#     }
#     result = client.intervee.topic.insert_one(document)

#     return result

# async def get_topic_by_id(query,projection):
#     result = await client.intervee.topic.find_one(query, projection=projection)
#     return result


# async def get_topic(query, projection, sort, skip):
#     result = await client.intervee.topic.find(query, projection=projection).sort(sort).skip(skip).to_list(None)
#     return result


# def get_topic_sync(query, projection, sort, skip, limit):
#     result = async_client.intervee.topic.find(query, projection=projection).sort(sort).skip(skip).limit(limit)
#     return result


# def update_topic(filter, update, upsert, *args):
#     result = client.intervee.topic.update_one(filter, update, upsert, *args)

#     return result


# def update_topic_sync(filter, update, upsert, *args):
#     result = async_client.intervee.topic.update_one(filter, update, upsert, *args)

#     return result


# def update_topics(filter, update, upsert, *args):
#     result = client.intervee.topic.update_many(filter, update, upsert, *args)

#     return result