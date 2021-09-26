from typing import List

from pydantic import BaseModel


class Request(BaseModel):
    N: int
    b: int
    p: float
    vectors: List[List[int]]


class Cluster(BaseModel):
    prototype: List[int]
    vectors: List[List[int]]


class Response(BaseModel):
    solution: List[Cluster]
