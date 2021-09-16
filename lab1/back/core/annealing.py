from math import exp
from typing import List

from core.solution import Solution
from random import random


class SimulatedAnnealing:
    def __init__(
            self,
            initial_temperature: float,
            final_temperature: float,
            alfa_for_temperature: float,
            steps_per_change: int,
            count_figures: int
    ):
        self.initial_temperature = initial_temperature
        self.final_temperature = final_temperature
        self.alfa_for_temperature = alfa_for_temperature
        self.steps_per_change = steps_per_change
        self.count_figures = count_figures

        self.time = 0
        self.temperature_statistic = []
        self.bed_statistic = []
        self.best_statistic = []

    def _append_statistic_point(self, statistic: List[dict], y: float):
        statistic.append({"x": self.time, "y": y})

    def get_solution(self) -> Solution:
        temperature = self.initial_temperature

        current = Solution.get_init_solution(self.count_figures)
        working = current.copy()
        best = current.copy()

        self._append_statistic_point(self.best_statistic, best.energy)
        self._append_statistic_point(self.temperature_statistic, temperature)

        while temperature > self.final_temperature:
            bed_for_second = 0

            for _ in range(self.steps_per_change):

                working.tweak()

                working_energy = working.energy
                current_energy = current.energy

                p = exp(-(working_energy - current_energy) / temperature)
                check_p = p > random()

                if check_p:
                    bed_for_second += 1

                if (working_energy <= current_energy) or \
                        (check_p):
                    current = working.copy()
                    if current.energy < best.energy:
                        best = current.copy()
                        self._append_statistic_point(self.best_statistic, best.energy)

                self.time += 1

            self._append_statistic_point(self.bed_statistic, bed_for_second)

            temperature *= self.alfa_for_temperature
            self._append_statistic_point(self.temperature_statistic, temperature)


        return best
