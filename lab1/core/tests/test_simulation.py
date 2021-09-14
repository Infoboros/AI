import pytest

from core.annealing import SimulatedAnnealing


@pytest.fixture
def simulation_8():
    return SimulatedAnnealing(
        30.0,
        0.5,
        0.98,
        100,
        8
    )


def test_simulation_8(simulation_8):
    solution = simulation_8.get_solution()

    assert solution.energy == 0
