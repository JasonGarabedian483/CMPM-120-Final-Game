# Galaxy Grub

Made by
----------------
Jason Garabedian,
Alexander Flores,
Jenny Wong,
Alicia Zhang,
Jose Baeza

-----------------------------------

# CORE REQUIREMENTS
- [Main Game]
    - [LINK TO PLAY](https://jasongarabedian483.github.io/CMPM-120-Final-Game/)

- [Prototypes]
    - [Cinematics Prototype](https://jasongarabedian483.github.io/CMPM-120-Final-Game/cinematics-1.html)
    - [Scene Flow Prototype](https://jasongarabedian483.github.io/CMPM-120-Final-Game/scene-flow-1.html)
    - [Core Gameplay Prototype](https://jasongarabedian483.github.io/CMPM-120-Final-Game/core-gameplay-1.html)

- [Theme]
    - Galaxy Grub is a futuristic sci-fi based cooking game that takes place on a nearby moon in the far off future

- [Selectable Requirements]
    - Advanced Visual assets:
        - Video tutorial at beginning of level 1
    - Procedural audio:
        - Timer ticking sound effect generated using tone.Synth
    - Procedural graphics:
        - Loading bar on loading screen
        - Stary background on loading screen
        - Timer bar at top of gameplay
    
- [Contributor Credits]
    - Alicia Zhang - Production lead
    - Alexander Flores - Testing Lead
    - Jason Garabedian - Technology Lead
    - Jenny Wong - Technology Backup
    - Jose Baeza - Production  Backup

- [Asset Credits]
    - Alicia Zhang
        - Main Menu / In game background
        - Settings menu UI buttons (Music, Volume, Settings, Retry, Home)
        - Parfait and parfait ingredients drawings
        - Pizza and pizza ingredients drawings
        - Service bell
    
    - Alexander Flores
        - Timer ticking sound effect

    - Jason Garabedian
        - Recipe board background / arrow
        - Crafting station 1 and 2
        - Placeholder Play, Options, and Quit in prototypes
        - Sparkle asset

    - Jenny Wong
        - Buttons
        - Conveyer Belt Gears
    
    - Jose Baeza
        - Title / Logo icons
        - Alien burger and alien burger ingredient drawings
        - Alien sushi and alien sushi ingredient drawings

    - OTHER SOURCES
        - Alien invasion music - creator: u_kw4gx9l0hh, source: [Pixabay.com](https://pixabay.com/sound-effects/musical-alien-invasion-276471/)
        - Button sound effect — creator: u_uev3l0tolc, source: [Pixabay.com](https://pixabay.com/sound-effects/technology-buttonon-521345/)
        - Kitchen timer alarm - creator: freesound_community, source: [Pixabay.com](https://pixabay.com/sound-effects/household-kitchen-timer-87485/)
        - Pixelify Sans font - source: [Google Fonts](https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400;700&display=swap)

--------------------------------------
# Cinematics Prototype Requirements

Non-interactive cinematic: 
- (Scenes/loadingScene.js): Game loading feedback and scene transition
- (Scenes/logoScene.js): Showcases game logo with transitions

Interactive cinematic: 
- (Scenes/mainMenu.js): Menu screen with interactive button options

Choreography in code:
- Tween chain in loading scene (Scenes/loadingScene.js) used for loading bar feedback and transition

-----------------------------------
# Scene Flow Prototype Requirements

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
- Button clicking sound effect when player clicks on a button in the main menu (source in scenes/mainMenu.js)
- Timer audio that increases in tempo as the timer gets closer to 0 (source in scenes/timer.js)

Visual:
- Image based sprites (source in scenes/mainMenu.js)
- Proceduraly made assets like conveyors and timer bar at top (source in scenes/timer.js)

Motion:
- Draggable object on conveyor belt in level 1 and 2 scenes (source in scenes/level1.js and scenes/level2.js)

Progression:
- Level 1 has a single slow conveyor that food ingredients will move along. Level 2 introduces a second faster and shorter conveyor that the player will have to interact with quickly while still interacting with the first one. This increase in difficulty forces the player to decide which ingredients they will need to prioritize

Prefabs:
- AlienBun prefab object in level1.js
- Button prefab object in mainMenu.js