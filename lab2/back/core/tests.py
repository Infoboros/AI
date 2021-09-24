import pytest

from core.art1 import ART1


def test_art11():
    N = 5
    b = 1
    p = 0.9

    clusters = ((1, 0, 0, 1, 1, 0, 1), (1, 1, 0, 0, 1, 1, 0))
    vectors_sign = ((1, 1, 1, 0, 0, 1, 0),)

    art1 = ART1(N, b, p)
    art1.clusterization(vectors_sign, clusters)

    print()
    for cluster in art1.clusters.keys():
        print(f"{cluster} -> {art1.clusters[cluster]}")
