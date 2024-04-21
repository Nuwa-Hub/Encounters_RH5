# from typing import Any, Optional

# from server.models import client, async_client


# def creating_image(email, password, role):
#     document = {
#         "email": email,
#         "password": password,
#         "role" : role,
#     }
#     result = client.intervee.users.insert_one(document)

#     return result


# async def get_user_by_id(query,projection):
#     result = await client.intervee.users.find_one(query, projection=projection)
#     return result


# async def get_users(query, projection, sort, skip):
#     result = await client.intervee.users.find(query, projection=projection).sort(sort).skip(skip).to_list(None)
#     return result


# def get_user_sync(query, projection, sort, skip, limit):
#     result = async_client.intervee.users.find(query, projection=projection).sort(sort).skip(skip).limit(limit)
#     return result


# def update_user(filter, update, upsert, *args):
#     result = client.intervee.users.update_one(filter, update, upsert, *args)

#     return result


# def update_user_sync(filter, update, upsert, *args):
#     result = async_client.intervee.users.update_one(filter, update, upsert, *args)

#     return result


# def update_users(filter, update, upsert, *args):
#     result = client.intervee.users.update_many(filter, update, upsert, *args)

#     return result
