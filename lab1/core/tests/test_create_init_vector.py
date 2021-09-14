import pytest

from collections import Counter

from core.utils import create_init_vector


@pytest.fixture
def init_vector():
    size = 20
    return size, create_init_vector(size)


def test_size_init_vector(init_vector):
    size, vector = init_vector
    assert size == len(vector)


def test_content_init_vector(init_vector):
    size, vector = init_vector

    counter = Counter(vector)
    assert len(counter.keys()) == size

    for el in range(size):
        assert counter[el]


def test_tweaking_init_vector(init_vector):
    size, vector = init_vector

    tmp_vector = vector.copy()
    tmp_vector.sort()

    assert vector != tmp_vector
