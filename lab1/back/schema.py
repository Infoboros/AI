from typing import List

from pydantic import BaseModel


class Request(BaseModel):
    initial_temperature: float
    final_temperature: float
    alfa_for_temperature: float
    steps_per_change: int
    count_figures: int


class Point(BaseModel):
    x: float
    y: float


class GraphicSchema(BaseModel):
    name: str
    data: List[Point]


class Response(BaseModel):
    solution: List[int]
    graphics: List[GraphicSchema] = []
