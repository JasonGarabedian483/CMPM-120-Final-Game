# Class Diagram

```mermaid
classDiagram

class PhaserScene {
    <<Phaser>>
}

class PhaserPhysicsArcadeImage {
    <<Phaser>>
}

class Audio {
    +constructor()
    +preload()
    +create()
}

class Credits {
    +constructor()
    +create()
}

class loadingScene {
    +constructor()
    +init(data)
    +preload()
    +create()
    +update()
}

class logoScene {
    +constructor()
    +preload()
    +create()
}

class mainMenu {
    +constructor()
    +preload()
    +create()
    +update()
    +getBigger()
    +getSmaller()
}

class ReplayScene {
    +constructor()
    +create()
}

class Summary {
    +constructor()
    +init(data)
    +create()
    +formatTime(seconds)
}

class TestingUI {
    +constructor()
    +create()
}

class Timer {
    +constructor()
    +preload()
    +init(data)
    +create()
    +update()
    +formatTime(seconds)
    +completed()
    +timeUp()
    +tempSummary()
}

class Level1 {
    +constructor()
    +preload()
    +create()
    +update()
}

class Level2 {
    +constructor()
    +preload()
    +create()
}

class Level3 {
    +constructor()
    +preload()
    +create()
}

class gameItem {
    +constructor(scene,x,y,texture)
}

PhaserScene <|-- Audio
PhaserScene <|-- Credits
PhaserScene <|-- loadingScene
PhaserScene <|-- logoScene
PhaserScene <|-- mainMenu
PhaserScene <|-- ReplayScene
PhaserScene <|-- Summary
PhaserScene <|-- TestingUI
PhaserScene <|-- Timer
PhaserScene <|-- Level1
PhaserScene <|-- Level2
PhaserScene <|-- Level3

PhaserPhysicsArcadeImage <|-- gameItem

Level1 ..> gameItem : creates
Level2 ..> gameItem : creates

Level1 ..> Timer : launches
Level2 ..> Timer : launches
Level3 ..> Timer : launches

mainMenu ..> Audio : launches
Timer ..> Summary : opens
```

## Notes

Methods inherited from Phaser and overridden by the project include:

* `preload()`
* `init()`
* `create()`
* `update()`

Custom methods authored by the team include:

* `getBigger()`
* `getSmaller()`
* `formatTime()`
* `completed()`
* `timeUp()`
* `tempSummary()`

The architecture follows a scene-based design in which most gameplay systems are implemented as subclasses of `Phaser.Scene`, while reusable ingredient objects are implemented through the `gameItem` prefab class, which extends `Phaser.Physics.Arcade.Image`.
