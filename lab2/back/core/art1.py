from collections import Counter


class ART1:

    def __init__(self, N: int, b: int, p: float):
        self.N = N
        self.b = b
        self.p = p
        self.clusters = {}

    @staticmethod
    def __get_weight(vector):
        return Counter(vector)[1]

    @staticmethod
    def __get_and(first, second):
        z_vector = zip(first, second)
        return tuple([el[0] & el[1] for el in z_vector])

    def __check_equal(self, P, E):
        PandE = self.__get_and(P, E)

        left_up = float(self.__get_weight(PandE))
        left_down = float(self.b + self.__get_weight(P))

        right_up = float(self.__get_weight(E))
        right_down = float(self.b + len(P))

        return (left_up / left_down) > (right_up / right_down)

    def __check_care(self, P, E):
        PandE = self.__get_and(P, E)
        left_up = float(self.__get_weight(PandE))
        left_down = float(self.__get_weight(E))

        return (left_up / left_down) < self.p

    def __clusterization(self, vectors_sign, change_clusters):
        for vector_sign in vectors_sign:

            new_clusters = {}
            clusterized = False
            for cluster in self.clusters.keys():
                if self.__check_equal(cluster, vector_sign) and self.__check_care(cluster, vector_sign):
                    clusterized = True
                    if change_clusters:
                        new_cluster = self.__get_and(cluster, vector_sign)
                    else:
                        new_cluster = cluster

                    new_clusters[new_cluster] = self.clusters[cluster] | {vector_sign}
                else:
                    new_clusters[cluster] = self.clusters[cluster]
            if (not clusterized) and len(self.clusters.keys()) < self.N:
                new_clusters[vector_sign] = {vector_sign}

            self.clusters = new_clusters

    def clusterization(self, vectors_sign, clusters):
        if clusters:
            self.clusters = {cluster: set() for cluster in clusters}
        else:
            self.clusters = {
                vectors_sign[0]: {vectors_sign[0]}
            }
        self.__clusterization(vectors_sign, True)
        self.__clusterization(vectors_sign, False)
