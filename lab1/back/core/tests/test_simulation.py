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
    alfas = [0.9, 0.91, 0.92, 0.93, 0.94, 0.95, 0.96, 0.97, 0.98, 0.99]

    for alfa in alfas:
        sim = SimulatedAnnealing(
            30.0,
            0.5,
            alfa,
            100,
            30
        ).get_solution()
        print(sim.energy)


