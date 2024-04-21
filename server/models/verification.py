from typing import Any, Optional

from server.models import client, async_client
from bson import ObjectId


def creating_verification(user_id, meeting_id):
    document = {
        "user_id": user_id,
        "meeting_id": meeting_id,
    }
    result = client.intervee.verification.insert_one(document)

    return result

async def get_verification_by_user_id(user_id):
    query={
        "user_id": user_id
    }
    result = await client.intervee.verification.find_one(query)
    return result


async def get_verification_by_meeting_id(meeting_id):
    query={
        "meeting_id": meeting_id
    }
    result = await client.intervee.verification.find_one(query)
    return result


async def get_verification_by_user_meeting_id(user_id,meeting_id):
    query={
        "user_id":user_id,
        "meeting_id": meeting_id
    }
    result = await client.intervee.verification.find_one(query)
    return result



# def get_verification_sync(query, projection, sort, skip, limit):
#     result = async_client.intervee.verification.find(query, projection=projection).sort(sort).skip(skip).limit(limit)
#     return result


# def update_verification(filter, update, upsert, *args):
#     result = client.intervee.verification.update_one(filter, update, upsert, *args)

#     return result


# def update_verification_sync(filter, update, upsert, *args):
#     result = async_client.intervee.verification.update_one(filter, update, upsert, *args)

#     return result


# def update_verifications(filter, update, upsert, *args):
#     result = client.intervee.verification.update_many(filter, update, upsert, *args)

#     return result
