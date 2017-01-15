1. Setters and getters called before init
2. Order of components matter
3. Width and height of external svg's needed
4. No external APIs
  - Audio: HTML `<audio>` tag
  - Networking: `WebSockets` api
  - Graphics: WebGL
  - Collision & Physics: Self-coded
5. 1 matrix needs to be stored in Camera. This will also multiply its scale by devicePixelRatio
