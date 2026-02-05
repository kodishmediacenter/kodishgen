from kivy.app import App
from kivy.uix.label import Label
from kivy.core.window import Window

class KindleOS(App):
    def build(self):
        Window.clearcolor = (0.95, 0.94, 0.90, 1)
        return Label(
            text="Kindle OS\n[Leitura Minimalista]",
            font_size=32
        )

if __name__ == "__main__":
    KindleOS().run()
