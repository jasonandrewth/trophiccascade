import { useRef, useState, useEffect } from 'react'
import * as THREE from 'three';
import Link from "next/link";
import gsap from 'gsap';

import { getStrapiMedia } from "lib/media";

// import search from '../../public/softskillscover2.png'

const Vis = ({ article }) => {

  const mount = useRef(null)
  const [isAnimating, setAnimating] = useState(true)
  const controls = useRef(null)
  const textureLoader = new THREE.TextureLoader()
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  
  const imageUrl = getStrapiMedia(article.image);


  useEffect(() => {
    let width = mount.current.clientWidth
    let height = mount.current.clientHeight
    
    let frameId

    const textureLoader = new THREE.TextureLoader()
    const articleTex = textureLoader.load('/softskillscover2.png')
    const displacementTex = textureLoader.load('/displacement.jpg')
    // console.log(imageUrl)
    //console.log(article.image)

    const scene = new THREE.Scene()
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    const geometry = new THREE.PlaneBufferGeometry(30, 10);
    const clock = new THREE.Clock;

    //Material
    const material = new THREE.ShaderMaterial({
      vertexShader: `
      //	Classic Perlin 3D Noise 
      //	by Stefan Gustavson
      //
      vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
      vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
      vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

      float cnoise(vec3 P){
        vec3 Pi0 = floor(P); // Integer part for indexing
        vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
        Pi0 = mod(Pi0, 289.0);
        Pi1 = mod(Pi1, 289.0);
        vec3 Pf0 = fract(P); // Fractional part for interpolation
        vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
        vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
        vec4 iy = vec4(Pi0.yy, Pi1.yy);
        vec4 iz0 = Pi0.zzzz;
        vec4 iz1 = Pi1.zzzz;

        vec4 ixy = permute(permute(ix) + iy);
        vec4 ixy0 = permute(ixy + iz0);
        vec4 ixy1 = permute(ixy + iz1);

        vec4 gx0 = ixy0 / 7.0;
        vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
        gx0 = fract(gx0);
        vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
        vec4 sz0 = step(gz0, vec4(0.0));
        gx0 -= sz0 * (step(0.0, gx0) - 0.5);
        gy0 -= sz0 * (step(0.0, gy0) - 0.5);

        vec4 gx1 = ixy1 / 7.0;
        vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
        gx1 = fract(gx1);
        vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
        vec4 sz1 = step(gz1, vec4(0.0));
        gx1 -= sz1 * (step(0.0, gx1) - 0.5);
        gy1 -= sz1 * (step(0.0, gy1) - 0.5);

        vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
        vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
        vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
        vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
        vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
        vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
        vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
        vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

        vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
        g000 *= norm0.x;
        g010 *= norm0.y;
        g100 *= norm0.z;
        g110 *= norm0.w;
        vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
        g001 *= norm1.x;
        g011 *= norm1.y;
        g101 *= norm1.z;
        g111 *= norm1.w;

        float n000 = dot(g000, Pf0);
        float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
        float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
        float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
        float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
        float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
        float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
        float n111 = dot(g111, Pf1);

        vec3 fade_xyz = fade(Pf0);
        vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
        vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
        float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
        return 2.2 * n_xyz;
      }

      //Rotation
    mat3 rotation3dY(float angle) {
    float s = sin(angle);
    float c = cos(angle);

    return mat3(
      c, 0.0, -s,
      0.0, 1.0, 0.0,
      s, 0.0, c
    );
  }
  
  vec3 rotateY(vec3 v, float angle) {
    return rotation3dY(angle) * v;
  } 

      uniform float uTime;
      uniform vec2 hover;
      uniform float hoverState;
      varying vec2 vUv;
      varying float vNoise;

      void main() {
        vec3 newposition = position;
        float PI = 3.1415925;

        float noise = cnoise(3.*vec3(position.x,position.y,position.z + uTime/30.));
        // newposition.z += noise * 10.;
        
        float dist = distance(uv, hover);

        vec3 pos = position + (normal * noise * 4. * hoverState);
        
        //newposition.z += hoverState*sin(dist*10. + uTime);
        // newposition.z += 0.05*sin(dist*40. );


        vNoise = hoverState*sin(dist*10. - uTime);
        vUv = uv;

        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
      }`,

      fragmentShader: `
      varying vec2 vUv;
      varying float vNoise;
      uniform float uTime;
      uniform float progress;
      uniform float intensity;
		  uniform float width;
		  uniform float scaleX;
		  uniform float scaleY;
		  uniform float transition;
		  uniform float radius;
		  uniform float swipe;
      uniform sampler2D uImage;
      uniform sampler2D uImage2;
      uniform sampler2D displacement;
      uniform vec4 resolution;
      uniform float hoverState;
      mat2 getRotM(float angle) {
		    float s = sin(angle);
		    float c = cos(angle);
		    return mat2(c, -s, s, c);
		  }

      const float PI = 3.1415;
		  const float angle1 = PI *0.25;
		  const float angle2 = -PI *0.75;

      void main() {
        vec2 newUV = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);
        //newUV = vec2(newUV.x, newUV.y + 0.01*sin(newUV.x*10. + uTime));

        vec4 disp = texture2D(displacement, newUV);
        vec2 dispVec = vec2(disp.r, disp.g);

        vec2 distortedPosition1 = newUV + getRotM(angle1) * dispVec * intensity * progress;
        vec4 t1 = texture2D(uImage, distortedPosition1);

        vec2 distortedPosition2 = newUV + getRotM(angle2) * dispVec * intensity * (1.0 - progress);
			  vec4 t2 = texture2D(uImage2, distortedPosition2);

        vec2 newerUV = vUv;
        vec2 p = newerUV;
        float x = hoverState;
        x = smoothstep(.0,1.0,(x*2.0+p.y-1.0));
        vec4 f = mix(
          texture2D(displacement, (p-.5)*(1.-x)+.5), 
          texture2D(uImage, (p-.5)*x+.5), 
          x);

        vec4 oceanView = texture2D(uImage,newUV);

        //gl_FragColor = vec4(vUv,0.,1.);
        //gl_FragColor = oceanView + 0.1*vec4(vNoise);
        //gl_FragColor = oceanView;
        // gl_FragColor = vec4(vNoise,0.,0.,1.);
        //gl_FragColor.rgb += 0.05*vec3(vNoise);
        gl_FragColor = f;
        gl_FragColor.rgb += 0.05*vec3(vNoise);
        
      }`,
      // Here you can pass args to your shaders (material or data).
      // Exemple "uResolution" in .ts >>>> input as "varying vec2 uResolution" in .glsl;
      // uResolution for responsive, uTime will be use by THREE.Clock
      uniforms: {
        uTime: { value: 0.0 },
        uImage: {value: textureLoader.load(imageUrl)},
        uImage2: {value: articleTex},
        progress: { type: "f", value: 0 },
        border: { type: "f", value: 0 },
        intensity: { type: "f", value: 0 },
        scaleX: { type: "f", value: 40 },
        scaleY: { type: "f", value: 40 },
        transition: { type: "f", value: 40 },
        swipe: { type: "f", value: 0 },
        width: { type: "f", value: 0 },
        radius: { type: "f", value: 0 },
        displacement: {value: displacementTex},
        hover: {value: new THREE.Vector2(0.5, 0.5)},
        resolution: { type: "v4", value: new THREE.Vector4() },
        //resolution: { value: { x: window.innerWidth, y: window.innerHeight } },
        uColor: { value: new THREE.Color(0xffffff) },
        hoverState: {value: 0}
      },
      wireframe: false
    });

    const material2 = new THREE.MeshBasicMaterial({color: 0xff0000})

    //Mesh
    const plane = new THREE.Mesh(geometry, material)
    plane.position.set(0, 0, 0);

    //Light
    const light = new THREE.SpotLight(0xffffff, 1);
    light.position.set(0, 0, 10);
    light.lookAt(plane.position);

    // Camera
    const fov = 45;
    // const fov = (180 * (2 * Math.atan(window.innerHeight / 2 / 800))) / Math.PI
    //const fov = 2*(180/Math.PI)*Math.atan(heightTool/(2*dist));
    // const aspect = width / height
    const aspect = window.innerWidth / window.innerHeight;
    const near = 1;
    const far = 100;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 0, 10);
    camera.lookAt(plane.position);

    //Add to scene
    scene.add(plane)

    //Renderer
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0xffffff, 1);
    renderer.setSize(width, height)

    const renderScene = () => {
      renderer.render(scene, camera)
    }

    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight * 0.5

      // width = mount.current.clientWidth
      // height = mount.current.clientHeight
      renderer.setSize(width, height)
      camera.aspect = width / height
      // renderer.setSize(window.innerWidth, height)
      // camera.aspect = window.innerWidth / height

      // image cover
      const imageAspect = article.image.height/article.image.width
      let a1; let a2;
      if (height/width > imageAspect) {
        a1 = (width/height) * imageAspect
        a2 = 1;
      } else {
        a1 = 1;
        a2 = (height/width) / imageAspect;
      }

      material.uniforms.resolution.value.x = width;
      material.uniforms.resolution.value.y = height;
      material.uniforms.resolution.value.z = a1;
      material.uniforms.resolution.value.w = a2;

      const dist  = camera.position.z;
      const heightTool = 1;
      //camera.fov = 2*(180/Math.PI)*Math.atan(heightTool/(2*dist));

      plane.scale.x = camera.aspect;
      plane.scale.y = camera.aspect;

      camera.updateProjectionMatrix()
      renderScene()
    }

    //Mouse Event
    mount.current.addEventListener('mousemove', (event) => {
      mouse.x = ( event.clientX / width ) * 2 - 1
	    mouse.y = - ( event.clientY / height ) * 2 + 1
      
      raycaster.setFromCamera(mouse, camera)
      // calculate objects intersecting the picking ray
	    const intersects = raycaster.intersectObjects( scene.children )

      if (intersects.length > 0) {
        material.uniforms.hover.value.x = mouse.x
        material.uniforms.hover.value.y = mouse.y
      }
    }, false)

    mount.current.addEventListener('mouseenter', () => {
      
      gsap.to(material.uniforms.hoverState,{
        duration:2,
        value:1,
        ease: "power3.out"
      })
    })

    mount.current.addEventListener('mouseout', (event) => {
      
      gsap.to(material.uniforms.hoverState,{
        duration:2,
        value:0,
        ease: "power3.out"
      })
    })


    
    const animate = () => {
      // cube.rotation.x += 0.01
      // cube.rotation.y += 0.01

      material.uniforms.uTime.value = clock.getElapsedTime();
      renderScene()
      frameId = window.requestAnimationFrame(animate)
    }

    const start = () => {
      if (!frameId) {
        frameId = requestAnimationFrame(animate)
      }
    }

    const stop = () => {
      cancelAnimationFrame(frameId)
      frameId = null
    }

    //SETUP
    mount.current.appendChild(renderer.domElement)
    window.addEventListener('resize', handleResize)
    start()
    handleResize()
    // console.log(mount.current)
    
    return () => {
      stop()
      window.removeEventListener('resize', handleResize)
      if (mount.current) {
        mount.current.removeChild(renderer.domElement)
      }
      
      console.log(mount)
      

      scene.remove(plane)
      geometry.dispose()
      material.dispose()
    }
  }, [])

  // useEffect(() => {
  //   if (isAnimating) {
  //     controls.current.start()
  //   } else {
  //     controls.current.stop()
  //   }
  // }, [isAnimating])


  
  return (
    <Link as={`/post/${article.slug}`} href="/post/[id]">
    <a className="testlink">
    <div 
      className="vis" 
      ref={mount} 
      onClick={() => setAnimating(!isAnimating)}
      // onMouseEnter={hoverStateOn} 
      // onMouseLeave={hoverStateOff}
    >
      <h2 className="vistitle" >{article.title}</h2>
    </div>
    </a>
    </Link>
  ) 
}

export default Vis