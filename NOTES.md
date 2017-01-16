1. Setters and getters called before init
2. Order of components matter
3. Width and height of external svg's needed
4. No external APIs
  - Audio: HTML `<audio>` tag
  - Networking: `WebSockets` api
  - Graphics: WebGL
  - Collision & Physics: Self-coded
5. 1 matrix needs to be stored in Camera
6. Order of attributes declared in component object matter e.g:
  `_attrib1 = 3
  _attrib2 = 4`
  Setter of attrib1 will be called before attrib2
  *NOTE*: Order of setter declaration matter in the same way
