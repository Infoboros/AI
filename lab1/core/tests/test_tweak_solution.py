import pytest

from core.utils import tweak_vector


@pytest.fixture
def vector_for_test_size():
    return 20


@pytest.fixture
def vector_for_test(vector_for_test_size):
    return [el for el in range(vector_for_test_size)]


@pytest.fixture
def tweaked_vector(vector_for_test):
    return tweak_vector(vector_for_test)


def test_consist_data_after_tweak(vector_for_test, tweaked_vector, vector_for_test_size):
    assert len(tweaked_vector) == len(vector_for_test)
    assert len(tweaked_vector) == vector_for_test_size

    for el in vector_for_test:
        assert el in tweaked_vector


def test_swap_data_after_tweak(vector_for_test, tweaked_vector, vector_for_test_size):
    diff_list = [index for index in range(vector_for_test_size)
                 if vector_for_test[index] != tweaked_vector[index]]

    assert len(diff_list) == 2
    first, second = diff_list

    assert vector_for_test[first] == tweaked_vector[second]
    assert vector_for_test[second] == tweaked_vector[first]
