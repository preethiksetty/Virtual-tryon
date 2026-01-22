# 3D Dress-Up Application using Three.js

An interactive web-based 3D dress-up application developed using Three.js.  
The application allows users to switch between multiple 3D human models and apply different clothing items such as tops, bottoms, hats, and glasses in real time.

This project demonstrates practical implementation of 3D rendering, GLTF model handling, and interactive user interfaces in a browser environment.

---

## Demo

Video demonstration of the application:  
[Watch Demo Video](demo/demo.mp4)

---

## Features

- Interactive 3D human models
- Real-time outfit customization
- Multiple clothing categories (tops, bottoms, hats, glasses)
- Smooth camera interaction using OrbitControls
- GLTF and GLB model support
- Responsive WebGL rendering

---

## Technologies Used

- JavaScript (ES6)
- Three.js
- HTML5
- CSS3
- GLTFLoader
- OrbitControls

---

## Project Structure
```project-folder/
│
├── demo/
│   └── demo.mp4
│
├── index.html
├── styles.css
├── script.js
│
└── assets/
   └── models/
   └── tops/
   └── bottoms/
   └── hats/
```
---

## Running the Project Locally

A local web server is required due to browser security restrictions when loading 3D assets.

### Option 1: Using Visual Studio Code
1. Open the project folder in Visual Studio Code
2. Install the Live Server extension
3. Right-click `index.html` and select **Open with Live Server**

### Option 2: Using Node.js
```bash
npx serve 
```

### Option 3: Using Python
```bash
python -m http.server
```
Open the following URL in your browser:
```bash
[python -m http.server](http://localhost:8000)
```
## Important Notes

Do not open index.html directly using the file system

Ensure all asset file paths match those referenced in script.js

Large 3D model files may require additional loading time depending on system performance

## Deployment

This project can be deployed using GitHub Pages or any static hosting service, as it is a frontend-only application.

## Author

Preethi K Setty




