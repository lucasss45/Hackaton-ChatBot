class Usuario:
    def __init__(self, nome, nickname, senha):
        self.nome = nome
        self.nickname = nickname
        self.senha = senha

usuario1 = Usuario("Lucas Vizeu", "lucas", "aluno")
usuario2 = Usuario("Jeferson Silva", "jefs", "senha")

usuarios = { usuario1.nickname : usuario1,
             usuario2.nickname : usuario2}