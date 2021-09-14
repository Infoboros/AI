from math import exp

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

    def get_solution(self) -> Solution:
        temperature = self.initial_temperature

        current = Solution.get_init_solution(self.count_figures)
        working = current.copy()
        best = current.copy()

        while temperature > self.final_temperature:
            for _ in range(self.steps_per_change):
                working.tweak()

                working_energy = working.energy
                current_energy = current.energy

                if (working_energy <= current_energy) or \
                        (exp(-(working_energy - current_energy) / temperature) > random()):
                    current = working.copy()
                    if current.energy < best.energy:
                        best = current.copy()

            temperature *= self.alfa_for_temperature

        return best
