import pytest

from core.utils import compute_energy


@pytest.fixture
def solution_with_8_conflicts():
    return [1, 2, 3, 0, 4]


@pytest.fixture
def solution_with_20_conflicts():
    return [4, 3, 2, 1, 0]


@pytest.fixture
def solution_without_conflicts():
    return [0, 4, 7, 5, 2, 6, 1, 3]


def test_solution_with_8_conflicts(solution_with_8_conflicts):
    energy = compute_energy(solution_with_8_conflicts)

    assert energy == 8


def test_solution_with_20_conflicts(solution_with_20_conflicts):
    energy = compute_energy(solution_with_20_conflicts)

    assert energy == 20


def test_solution_without_conflicts(solution_without_conflicts):
    energy = compute_energy(solution_without_conflicts)

    assert energy == 0
