/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../who-loves-voxels/index.js":
/*!************************************!*\
  !*** ../who-loves-voxels/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = (function who_loves_voxels() {\n\n  // Math\n  \n  function quat_from_axis_angle([ax, ay, az], angle) {\n    var qw = Math.cos(angle / 2);\n    var qx = ax * Math.sin(angle / 2);\n    var qy = ay * Math.sin(angle / 2);\n    var qz = az * Math.sin(angle / 2);\n    return [qw, qx, qy, qz];\n  }\n\n  function quat_mul([aw, ax, ay, az], [bw, bx, by, bz]) { \n      var x =  ax * bw + ay * bz - az * by + aw * bx;\n      var y = -ax * bz + ay * bw + az * bx + aw * by;\n      var z =  ax * by - ay * bx + az * bw + aw * bz;\n      var w = -ax * bx - ay * by - az * bz + aw * bw;\n      return [w, x, y, z];\n  };\n\n  function quat_conjugate([w, x, y, z]) {\n    return [w, -x, -y, -z];\n  }\n\n  function vec_rotate([x, y, z], q) {\n    return quat_mul(quat_mul(q, [0, x, y, z]), quat_conjugate(q)).slice(1);\n  }\n\n  function vec_add([ax, ay, az], [bx, by, bz]) {\n    return [ax + bx, ay + by, az + bz];\n  }\n\n  function vec_sub([ax, ay, az], [bx, by, bz]) {\n    return [ax - bx, ay - by, az - bz];\n  }\n\n  function vec_scale([ax, ay, az], s) {\n    return [ax * s, ay * s, az * s];\n  }\n\n  function vec_len([ax, ay, az]) {\n    return Math.sqrt(ax * ax + ay * ay + az * az);\n  }\n\n  function vec_dist([ax, ay, az], [bx, by, bz]) {\n    return Math.sqrt((bx - ax) * (bx - ax) + (by - ay) * (by - ay) + (bz - az) * (bz - az));\n  }\n\n  function cam_tox(cam) {\n    return vec_rotate([1, 0, 0], cam.rot);\n  }\n\n  function cam_toy(cam) {\n    return vec_rotate([0, 1, 0], cam.rot);\n  }\n\n  function cam_toz(cam) {\n    return vec_rotate([0, 0, 1], cam.rot);\n  }\n\n  var quat_rot_x = angle => quat_from_axis_angle([1, 0, 0], angle);\n  var quat_rot_y = angle => quat_from_axis_angle([0, 1, 0], angle);\n  var quat_rot_z = angle => quat_from_axis_angle([0, 0, 1], angle);\n\n  function sprite({loc, siz, pos, col, vox}) {\n    if (typeof vox === \"function\") {\n      var data = new Uint8Array(siz[0] * siz[1] * siz[2] * 4);\n      for (var z = 0; z < siz[2]; ++z) {\n        for (var y = 0; y < siz[1]; ++y) {\n          for (var x = 0; x < siz[0]; ++x) {\n            var rgba = vox([x, y, z]);\n            var idx = (x + y * siz[0] + z * siz[0] * siz[1]) * 4;\n            data[idx + 0] = (rgba & 0xFF000000) >>> 24;\n            data[idx + 1] = (rgba & 0xFF0000) >>> 16;\n            data[idx + 2] = (rgba & 0xFF00) >>> 8;\n            data[idx + 3] = (rgba & 0xFF);\n          }\n        }\n      };\n    } else {\n      var data = null;\n    }\n    return {loc, siz, pos, vox, col, data};\n  }\n\n  function cam(pos, dis = 2.0, rot = quat_rot_z(0.0)) {\n    return {pos, dis, rot};\n  }\n\n  // ============== Creating a canvas ====================\n\n  function install(canvas, voxel_siz, debug) {\n    gl = canvas.getContext('webgl2');\n\n    var vertices = [-1,1,0,-1,-1,0,1,-1,0,-1,1,0,1,1,0,1,-1,0,];\n    var indices = [0,1,2,3,4,5];\n\n    var vertex_buffer = gl.createBuffer();\n    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);\n    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);\n    gl.bindBuffer(gl.ARRAY_BUFFER, null);\n\n    var index_buffer = gl.createBuffer();\n    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);\n    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);\n    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);\n\n    // Vertex shader source code\n    var vert_code = `#version 300 es\n      in vec3 coordinates;\n      out vec3 scr_pos;\n      void main(void) {\n        scr_pos = coordinates;\n        gl_Position = vec4(coordinates, 1.0);\n      }\n    `;\n      \n    var vertShader = gl.createShader(gl.VERTEX_SHADER);\n    gl.shaderSource(vertShader, vert_code);\n    gl.compileShader(vertShader);\n\n    var frag_code = `#version 300 es\n      precision highp float;\n      precision lowp sampler3D;\n\n      in vec3 scr_pos;\n      out vec4 outColor;\n\n      uniform vec3 voxel_siz;\n      uniform sampler3D voxel_data;\n\n      uniform int  sprite_len;\n      uniform vec3 sprite_loc[64];\n      uniform vec3 sprite_pos[64];\n      uniform vec3 sprite_siz[64];\n\n      uniform vec3 cam_pos;\n      uniform vec3 cam_tox;\n      uniform vec3 cam_toy;\n      uniform vec3 cam_toz;\n      uniform float cam_dis;\n      uniform float time;\n\n      const float inf = 3.402823466e+38; // TODO: how to improve this constant?\n      const float eps = 0.001;\n\n      struct Sprite {\n        vec3 loc; \n        vec3 siz;\n        vec3 pos;\n      };\n\n      struct Hit {\n        float dist;\n        int idx;\n        Sprite spr;\n      };\n\n      float ray_box_intersect(vec3 ray_pos, vec3 ray_dir, vec3 box_pos, vec3 box_siz) {\n        vec3 box_min = box_pos - box_siz * 0.5;\n        vec3 box_max = box_pos + box_siz * 0.5;\n        float t1 = (box_min.x - ray_pos.x) / ray_dir.x;\n        float t2 = (box_max.x - ray_pos.x) / ray_dir.x;\n        float t3 = (box_min.y - ray_pos.y) / ray_dir.y;\n        float t4 = (box_max.y - ray_pos.y) / ray_dir.y;\n        float t5 = (box_min.z - ray_pos.z) / ray_dir.z;\n        float t6 = (box_max.z - ray_pos.z) / ray_dir.z;\n        float t7 = max(max(min(t1, t2), min(t3, t4)), min(t5, t6));\n        float t8 = min(min(max(t1, t2), max(t3, t4)), max(t5, t6));\n        float t9 = (t8 < 0.0 || t7 > t8) ? inf : t7;\n        return t9;\n      }\n\n      // Returns the distance between a ray and its intersection in a sphere\n      // Returns the distance even if ray origin is inside sphere\n      // Returns -1.0 if collision point is behind\n      // Returns -1.0 if there is no collision point\n      float ray_sphere_intersect\n        ( vec3 ray_pos\n        , vec3 ray_dir\n        , vec3 sphere_pos\n        , float sphere_rad) {\n        float a = dot(ray_dir, ray_dir);\n        vec3 k = ray_pos - sphere_pos;\n        float b = 2.0 * dot(ray_dir, k);\n        float c = dot(k, k) - (sphere_rad * sphere_rad);\n        float d = b*b - 4.0 * a * c; // negative if non-colliding\n        float p = (-b - sqrt(d)) / (2.0 * a); // 1st point, negative if behind\n        float q = (-b + sqrt(d)) / (2.0 * a); // 2nd point, negative if behind\n        return d < 0.0 ? -1.0 : p < 0.0 ? (q < 0.0 ? -1.0 : q) : p;\n      }\n\n      float surface_distance(vec3 pos) {\n        vec3  a_pos = vec3( 0.0, 0.0, 10.0);\n        float a_rad = 0.6;\n        vec3 v = a_pos - pos;\n        return sqrt(v.x * v.x + v.y * v.y + v.z * v.z) - a_rad;\n      }\n\n      float sdf_union(float a, float b) {\n        return min(a, b);\n      }\n\n      float sdf_intersection(float a, float b) {\n        return max(a, b);\n      }\n\n      float sdf_smooth(float k, float a, float b) {\n        float res = exp(-k*a) + exp(-k*b);\n        return -log(max(0.0001,res)) / k;\n      }\n\n      float sdf_sphere(vec3 p, vec3 c, float s) {\n        return length(p - c) - s;\n      }\n\n      float sdf_box(vec3 p, vec3 b) {\n        vec3 d = abs(p) - b;\n        return length(max(d,0.0)) + min(max(d.x,max(d.y,d.z)),0.0);\n      }\n\n      float sdf_y_plane(vec3 p, float y) {\n        return p.y - y;\n      }\n\n      vec4 get_vox(Sprite spr, vec3 pos) {\n        if (spr.loc.x < 0.0) {\n          return vec4(-spr.loc / 255.0, 1.0);\n        } else {\n          vec3 d = spr.siz * 0.5 - abs(pos - spr.pos);\n          if (d.x >= 0.0 && d.y >= 0.0 && d.z >= 0.0) {\n            //return texture(voxel_data, vec3(0.5,0.5,0.5));\n            return texture(voxel_data, (spr.loc + vec3(0.5,0.5,0.5) * spr.siz + (pos - spr.pos)) / voxel_siz);\n          } else {\n            return vec4(0.0);\n          }\n        }\n      }\n\n      Hit next_hit(vec3 ray_pos, vec3 ray_dir) {\n        int idx = -1;\n        float dist = inf;\n        for (int i = 0; i < sprite_len; ++i) {\n          float sprite_dist = ray_box_intersect(ray_pos, ray_dir, sprite_pos[i], sprite_siz[i]);\n          idx = dist > 0.0 && sprite_dist < dist ? i : idx;\n          dist = min(sprite_dist, dist);\n        }\n        return Hit(dist, idx, Sprite(sprite_loc[idx], sprite_siz[idx], sprite_pos[idx]));\n      }\n\n      bool inside(vec3 pos, vec3 box_pos, vec3 box_siz) {\n        vec3 d = box_siz * 0.5 - abs(pos - box_pos);\n        return d.x >= 0.0 && d.y >= 0.0 && d.z >= 0.0;\n      }\n\n      void main(void) {\n        float ray_step = 0.5;\n        vec3 ray_pos = cam_pos;\n        vec3 ray_dir = normalize(cam_tox * scr_pos.x + cam_toy * scr_pos.y + cam_toz * cam_dis);\n\n        Hit hit = next_hit(ray_pos, ray_dir);\n        ray_pos = ray_pos + ray_dir * (hit.dist + eps);\n\n        float r = 1.0;\n        float g = 1.0;\n        float b = 1.0;\n        float a = 1.0;\n\n        for (float k = 0.0; k < 512.0; ++k) {\n          if (hit.idx == -1)\n            break;\n          if (inside(ray_pos, hit.spr.pos, hit.spr.siz)) {\n            ray_pos += ray_dir * ray_step;\n            vec4 vox = get_vox(hit.spr, ray_pos);\n            float sa = vox.w;\n            if (sa > 0.0) {\n              r -= (1.0 - vox.x) * sa * ray_step;\n              g -= (1.0 - vox.y) * sa * ray_step;\n              b -= (1.0 - vox.z) * sa * ray_step;\n              a -= sa * ray_step;\n            }\n            if (sa == 1.0) {\n              vec3 sun_dir = normalize(vec3(cos(time), sin(time), 1.0));\n              hit = next_hit(ray_pos + sun_dir * ray_step * 2.0, sun_dir);\n              if (hit.idx != -1) {\n                r *= 0.5;\n                g *= 0.5;\n                b *= 0.5;\n              }\n              break;\n            }\n          } else {\n            hit = next_hit(ray_pos, ray_dir);\n            ray_pos = ray_pos + ray_dir * (hit.dist + eps);\n          }\n        }\n\n        outColor = vec4(r, g, b, 1.0);\n      }`;\n      \n    var fragShader = gl.createShader(gl.FRAGMENT_SHADER);\n    gl.shaderSource(fragShader, frag_code); \n    gl.compileShader(fragShader);\n\n    // TODO: improve\n    if (true) {\n      var compiled = gl.getShaderParameter(vertShader, gl.COMPILE_STATUS);\n      console.log('Shader compiled successfully: ' + compiled);\n      var compilationLog = gl.getShaderInfoLog(vertShader);\n      console.log('Shader compiler log: ' + compilationLog);\n      var compiled = gl.getShaderParameter(fragShader, gl.COMPILE_STATUS);\n      console.log('Shader compiled successfully: ' + compiled);\n      var compilationLog = gl.getShaderInfoLog(fragShader);\n      console.log('Shader compiler log: ' + compilationLog);\n    }\n\n    var shader = gl.createProgram();\n    gl.attachShader(shader, vertShader);\n    gl.attachShader(shader, fragShader);\n    gl.linkProgram(shader);\n    gl.useProgram(shader);\n\n    // ======= Input texture =======\n\n    var texture = gl.createTexture();\n    gl.activeTexture(gl.TEXTURE0);\n    gl.bindTexture(gl.TEXTURE_3D, texture);\n    gl.texImage3D(gl.TEXTURE_3D, 0, gl.RGBA, voxel_siz[0], voxel_siz[1], voxel_siz[2], 0, gl.RGBA, gl.UNSIGNED_BYTE, null);\n    gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);\n    gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);\n    gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);\n    gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);\n    gl.texParameteri(gl.TEXTURE_3D, gl.TEXTURE_WRAP_R, gl.CLAMP_TO_EDGE);\n    gl.uniform1i(gl.getUniformLocation(shader, \"voxel_data\"), texture);\n    gl.uniform3fv(gl.getUniformLocation(shader, \"voxel_siz\"), voxel_siz);\n\n    // ======= Associating shaders to buffer objects =======\n\n    // Bind vertex buffer object\n    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);\n    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index_buffer);\n\n    // Get the attribute location\n    var coord = gl.getAttribLocation(shader, \"coordinates\");\n    gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0); \n    gl.enableVertexAttribArray(coord);\n\n    var start = Date.now() / 1000;\n    canvas.__who_loves_voxels = {gl, shader, indices, start};\n  }\n\n  function render(canvas, cam, sprites, voxel_siz = [256, 256, 256], debug = false) {\n    if (!canvas.__who_loves_voxels) {\n      install(canvas, voxel_siz, debug);\n    } \n\n    var {gl, shader, indices, start} = canvas.__who_loves_voxels;\n\n    // Sprites\n    var sprite_loc = [];\n    var sprite_pos = [];\n    var sprite_siz = [];\n    for (var i = 0; i < sprites.length; ++i) {\n      if (sprites[i].col !== undefined) {\n        sprite_loc.push(-((sprites[i].col & 0xFF000000) >>> 24), -((sprites[i].col & 0xFF0000) >>> 16), -((sprites[i].col & 0xFF00) >>> 8));\n      } else {\n        sprite_loc.push(sprites[i].loc[0], sprites[i].loc[1], sprites[i].loc[2]);\n      }\n      sprite_pos.push(sprites[i].pos[0], sprites[i].pos[1], sprites[i].pos[2]);\n      sprite_siz.push(sprites[i].siz[0], sprites[i].siz[1], sprites[i].siz[2]);\n    }\n\n    // Upload sprite data\n    for (var i = 0; i < sprites.length; ++i) {\n      if (sprites[i].data) {\n        gl.texSubImage3D(gl.TEXTURE_3D, 0, sprites[i].loc[0], sprites[i].loc[1], sprites[i].loc[2], sprites[i].siz[0], sprites[i].siz[1], sprites[i].siz[2], gl.RGBA, gl.UNSIGNED_BYTE, sprites[i].data);\n        sprites[i].data = null;\n      }\n    }\n    gl.uniform1i(gl.getUniformLocation(shader, \"sprite_len\"), sprites.length);\n    gl.uniform3fv(gl.getUniformLocation(shader, \"sprite_loc\"), sprite_loc);\n    gl.uniform3fv(gl.getUniformLocation(shader, \"sprite_pos\"), sprite_pos);\n    gl.uniform3fv(gl.getUniformLocation(shader, \"sprite_siz\"), sprite_siz);\n\n    // Upload camera data\n    gl.uniform3fv(gl.getUniformLocation(shader, \"cam_pos\"), cam.pos);\n    gl.uniform3fv(gl.getUniformLocation(shader, \"cam_tox\"), cam_tox(cam));\n    gl.uniform3fv(gl.getUniformLocation(shader, \"cam_toy\"), cam_toy(cam));\n    gl.uniform3fv(gl.getUniformLocation(shader, \"cam_toz\"), cam_toz(cam));\n    gl.uniform1f(gl.getUniformLocation(shader, \"cam_dis\"), cam.dis);\n    gl.uniform1f(gl.getUniformLocation(shader, \"time\"), Date.now() / 1000 - start);\n\n    // Clear and render\n    gl.clearColor(0.5, 0.5, 0.5, 1.0);\n    gl.enable(gl.DEPTH_TEST);\n    gl.clear(gl.COLOR_BUFFER_BIT);\n    gl.viewport(0,0,canvas.width,canvas.height);\n    gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT,0);\n  };\n\n  return {\n    quat_from_axis_angle,\n    quat_mul,\n    quat_conjugate,\n    quat_rot_x,\n    quat_rot_y,\n    quat_rot_z,\n    vec_rotate,\n    vec_add,\n    vec_sub,\n    vec_scale,\n    vec_len,\n    vec_dist,\n    cam_tox,\n    cam_toy,\n    cam_toz,\n    cam,\n    sprite,\n    render\n  };\n\n})();\n\n\n//# sourceURL=webpack:///../who-loves-voxels/index.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const wlv = __webpack_require__(/*! ../../who-loves-voxels */ \"../who-loves-voxels/index.js\");\n\nwindow.onload = function() {\n  // Canvas\n  var canvas = document.createElement(\"canvas\");\n  canvas.width = canvas.height = 512;\n  canvas.style.border = \"1px solid #A0A0A0\";\n  document.getElementById(\"main\").appendChild(canvas);\n\n  // Keyboard events\n  var key = {};\n  for (var i = 0; i < 255; ++i) { key[String.fromCharCode(i)] = 0; }\n  document.body.onkeydown = (e) => key[e.key] = 1;\n  document.body.onkeyup = (e) => key[e.key] = 0;\n\n  // Camera\n  var cam = wlv.cam([128, 128, 128]);\n  cam.rot = wlv.quat_mul(cam.rot, wlv.quat_rot_x(Math.PI));\n  cam.rot = wlv.quat_mul(cam.rot, wlv.quat_rot_y(-Math.PI * 0.25));\n  cam.rot = wlv.quat_mul(cam.rot, wlv.quat_rot_z(Math.PI * 0.25));\n\n  // Sprites\n  var sprites = [];\n  sprites.push(wlv.sprite({\n    col: 0xD0F0E0FF,\n    siz: [256, 256, 32],\n    pos: [0, 0, -64]\n  }));\n  sprites.push(wlv.sprite({\n    col: 0x606060FF,\n    siz: [16, 16, 256],\n    pos: [0, 0, 0]\n  }));\n  sprites.push(wlv.sprite({\n    loc: [0, 0, 0], \n    siz: [32, 32, 32], \n    pos: [0, 0, 0], \n    vox: ([x,y,z]) => 0xFF000008\n  }));\n  sprites.push(wlv.sprite({\n    loc: [64, 0, 0], \n    siz: [64, 64, 64], \n    pos: [72, 0, 0], \n    vox: ([x,y,z]) => (wlv.vec_dist([x,y,z], [32,32,32]) < 16 ? 0x00FF0008 : 0x00)\n  }));\n  sprites.push(wlv.sprite({\n    loc: [128, 0, 0],\n    siz: [32, 32, 32],\n    pos: [0, 72, 0],\n    vox: ([x,y,z]) => 0x0000FF04\n  }));\n\n  // Render loop\n  function render() {\n    cam.rot = wlv.quat_mul(cam.rot, wlv.quat_rot_x((key.k - key.i) * Math.PI * 0.006));\n    cam.rot = wlv.quat_mul(cam.rot, wlv.quat_rot_y((key.l - key.j) * Math.PI * 0.006));\n    cam.pos = wlv.vec_add(cam.pos, wlv.vec_scale(wlv.cam_tox(cam), (key.f - key.s) * 3.0));\n    cam.pos = wlv.vec_add(cam.pos, wlv.vec_scale(wlv.cam_toy(cam), (key.r - key.w) * 3.0));\n    cam.pos = wlv.vec_add(cam.pos, wlv.vec_scale(wlv.cam_toz(cam), (key.e - key.d) * 3.0));\n\n    wlv.render(canvas, cam, sprites);\n    window.requestAnimationFrame(render);\n  }\n  window.requestAnimationFrame(render);\n}\n\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ })

/******/ });