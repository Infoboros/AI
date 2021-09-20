import random

from fastapi.routing import APIRouter

from schema import Request, Response

from core.annealing import SimulatedAnnealing

router = APIRouter()


@router.post("", response_model=Response)
def get_solution(
        request: Request
):
    random.seed()
    simulation = SimulatedAnnealing(
        request.initial_temperature,
        request.final_temperature,
        request.alfa_for_temperature,
        request.steps_per_change,
        request.count_figures
    )

    solution = simulation.get_solution()

    return {
        "solution": solution.solution,
        "graphics": [
            {
                "name": 'Температура',
                "data": simulation.temperature_statistic,
            },
            {
                "name": 'Принятия плохих решений',
                "data": simulation.bed_statistic,
            },
            {
                "name": 'Энергия лучшего решения',
                "data": simulation.best_statistic,
            }
        ]
    }
