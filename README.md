# CMPM-120-Final-Game

Game Credits
----------------
Jason Garabedian,
Alexander Flores,
Jenny Wong,
Alicia Zhang,
Jose Baeza

-----------------------------------
# Cinematics Prototype Requirements

Non-interactive cinematic: 
- (Scenes/loadingScene.js): Game loading feedback and scene transition
- (Scenes/logoScene.js): Showcases game logo with transitions

Interactive cinematic: 
- (Scenes/mainMenu.js): Menu screen with interactive button options

Choreography in code:
- Tween chain in loading scene (Scenes/loadingScene.js) used for loading bar feedback and transition

-----------------------------------
# Scene Prototype Requirements

Scene types:
- Main title/logo scene and loading scene
- Main menu scene
- Credit scene 
- Gameplay/Level 1 scene

Communication between scenes:
- Music mute button toggle saves state between scenes, allowing for music choice to be saved

Reachability:
- In Level 1 there are different buttons as placeholders for different end level results. If players don't reach a score threshold they will get a replay scene, and then they can return to the main menu. If they pass the score threshold they can either return to the main menu or start Level 2.
- When viewing the credits scene players are also able to return to the main menu.

Transitions:
- Coordinated fade to black and fade from black between main menu and credits screen

# Core Gameplay Prototype Requirements

Audio:
- Looping background sound (Menu music)
- Button clicking sound effect when player clicks on a button in the main menu
- Timer audio that increases in tempo as the timer gets closer to 0

Visual:
- Image based sprites
- Proceduraly made assets like conveyors and timer bar at top

Motion:
- Draggable object on conveyor belt in level 1 scene

Progression:
- Level 1 has a single slow conveyor that food ingredients will move along. Level 2 introduces a second faster and shorter conveyor that the player will have to interact with quickly while still interacting with the first one. This increase in difficulty forces the player to decide which ingredients they will need to prioritize

Prefabs:
- Need two