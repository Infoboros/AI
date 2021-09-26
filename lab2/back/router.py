import random

from fastapi.routing import APIRouter

from core.art1 import ART1
from schema import Request, Response

router = APIRouter()


@router.post("", response_model=Response)
def get_solution(
        request: Request
):
    art1 = ART1(
        request.N,
        request.b,
        request.p
    )

    art1.clusterization([tuple(vector) for vector in request.vectors], ())
    clusters = art1.clusters

    return {
        "solution": [
            {
                "prototype": cluster,
                "vectors": list(clusters[cluster])
            } for cluster in clusters.keys()
        ]
    }
