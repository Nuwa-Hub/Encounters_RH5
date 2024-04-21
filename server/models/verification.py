from typing import Any, Optional

from server.models import client, async_client


def creating_verification(user_id, meeting_id):
    document = {
        "user_id": user_id,
        "meeting_id": meeting_id,
    }
    result = client.intervee.verification.insert_one(document)

    return result