# from typing import Any, Optional

# from server.models import client, async_client


# def creating_image(meet_id, user_id, image_url, timestamp):
#     document = {
#         "meetId": meet_id,
#         "userId": user_id,
#         "imageUrl" : image_url,
#         "timestamp": timestamp,
#     }
#     result = client.intervee.images.insert_one(document)

#     return result

# async def get_image_by_id(query,projection):
#     result = await client.intervee.images.find_one(query, projection=projection)
#     return result


# async def get_image(query, projection, sort, skip):
#     result = await client.intervee.images.find(query, projection=projection).sort(sort).skip(skip).to_list(None)
#     return result


# def get_image_sync(query, projection, sort, skip, limit):
#     result = async_client.intervee.images.find(query, projection=projection).sort(sort).skip(skip).limit(limit)
#     return result


# def update_image(filter, update, upsert, *args):
#     result = client.intervee.images.update_one(filter, update, upsert, *args)

#     return result


# def update_image_sync(filter, update, upsert, *args):
#     result = async_client.intervee.images.update_one(filter, update, upsert, *args)

#     return result


# def update_images(filter, update, upsert, *args):
#     result = client.intervee.images.update_many(filter, update, upsert, *args)

#     return result