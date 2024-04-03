import * as THREE from "three"
import Experience from "../Experience"
import PreLoader from "../PreLoader"
import Debug from "./Debug"
import Resources from "./Resources"

export default class Materials {
  experience: Experience
  debug: Debug
  scene: THREE.Scene
  resources: Resources
  preLoader: PreLoader
  items: {[key: string]: any} = {}
  ethMaterial: any
  chestMaterial: any
  contractInterfaceMaterial: any
  deployContract: any

  constructor() {
    this.experience = Experience.Instance()
    this.debug = this.experience.debug
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.preLoader = this.experience.preLoader

    // Wait for textures
    this.resources.on('ready', () =>
    {
      this.mapTextures()
    })
  }

  mapTextures()
  {
    Object.entries(this.resources.items).forEach((key: any) => {
      if (key[0].slice(-4) === "Icon") {
        this.resources.items[`${key[0]}`].encoding = THREE.sRGBEncoding
        this.resources.items[`${key[0]}`].minFilter = THREE.NearestFilter
      }
    })

    // this.items.contractInterfaceMaterial = new THREE.MeshStandardMaterial({ transparent: true, depthWrite: false, map: this.resources.items.bakedInputScreenTexture, side: THREE.DoubleSide })
    this.items.contractInterfaceMaterial = new THREE.MeshStandardMaterial({ transparent: true, opacity: 0.8, color: "#000000", depthWrite: false, side: THREE.DoubleSide })

    // functions materials
    this.items.addWhitelist         = new THREE.MeshBasicMaterial({ alphaTest: 0.001, map: this.resources.items.addWhitelistIcon, side: THREE.DoubleSide })
    this.items.approveErc20         = new THREE.MeshBasicMaterial({ alphaTest: 0.001, map: this.resources.items.approveErc20Icon, side: THREE.DoubleSide })
    this.items.approveErc721        = new THREE.MeshBasicMaterial({ alphaTest: 0.001, map: this.resources.items.approveErc721Icon, side: THREE.DoubleSide })
    this.items.approveAllErc721     = new THREE.MeshBasicMaterial({ alphaTest: 0.001, map: this.resources.items.approveAllErc721Icon, side: THREE.DoubleSide })
    this.items.approveAllErc1155    = new THREE.MeshBasicMaterial({ alphaTest: 0.001, map: this.resources.items.approveAllErc1155Icon, side: THREE.DoubleSide })
    
    this.items.batchBurnErc1155     = new THREE.MeshBasicMaterial({ alphaTest: 0.1, map: this.resources.items.batchBurnErc1155Icon, side: THREE.DoubleSide })
    this.items.batchLoot            = new THREE.MeshBasicMaterial({ alphaTest: 0.1, map: this.resources.items.batchLootIcon, side: THREE.DoubleSide })
    this.items.batchMintErc1155     = new THREE.MeshBasicMaterial({ alphaTest: 0.1, map: this.resources.items.batchMintErc1155Icon, side: THREE.DoubleSide })
    this.items.batchTransferErc1155 = new THREE.MeshBasicMaterial({ alphaTest: 0.1, map: this.resources.items.batchTransferErc1155Icon, side: THREE.DoubleSide })
    this.items.burnErc20            = new THREE.MeshBasicMaterial({ alphaTest: 0.1, map: this.resources.items.burnErc20Icon, side: THREE.DoubleSide })
    this.items.burnErc721           = new THREE.MeshBasicMaterial({ alphaTest: 0.1, map: this.resources.items.burnErc721Icon, side: THREE.DoubleSide })
    this.items.burnErc1155          = new THREE.MeshBasicMaterial({ alphaTest: 0.1, map: this.resources.items.burnErc1155Icon, side: THREE.DoubleSide })
    
    this.items.deployContract       = new THREE.MeshBasicMaterial({ alphaTest: 0.01, map: this.resources.items.deployContractIcon, side: THREE.DoubleSide })
    this.items.deposit              = new THREE.MeshBasicMaterial({ alphaTest: 0.1, map: this.resources.items.depositIcon, side: THREE.DoubleSide })

    this.items.ethConnected         = new THREE.MeshStandardMaterial({ transparent: true, opacity: 0.9, color: "#6b40c8", metalness: 0.7, roughness: 0.5, toneMapped: false})
    
    this.items.import               = new THREE.MeshBasicMaterial({ alphaTest: 0.1, map: this.resources.items.importIcon, side: THREE.DoubleSide })
    
    this.items.loot                 = new THREE.MeshBasicMaterial({ alphaTest: 0.1, map: this.resources.items.lootIcon, side: THREE.DoubleSide })

    this.items.mintErc20            = new THREE.MeshBasicMaterial({ alphaTest: 0.001, map: this.resources.items.mintErc20Icon, side: THREE.DoubleSide })
    this.items.mintErc721           = new THREE.MeshBasicMaterial({ alphaTest: 0.001, map: this.resources.items.mintErc721Icon, side: THREE.DoubleSide })
    this.items.mintErc1155          = new THREE.MeshBasicMaterial({ alphaTest: 0.001, map: this.resources.items.mintErc1155Icon, side: THREE.DoubleSide })
    
    this.items.transferErc20        = new THREE.MeshBasicMaterial({ alphaTest: 0.001, map: this.resources.items.transferErc20Icon, side: THREE.DoubleSide })
    this.items.transferErc721       = new THREE.MeshBasicMaterial({ alphaTest: 0.001, map: this.resources.items.transferErc721Icon, side: THREE.DoubleSide })
    this.items.transferErc1155      = new THREE.MeshBasicMaterial({ alphaTest: 0.001, map: this.resources.items.transferErc1155Icon, side: THREE.DoubleSide })
    this.items.transferOwnership    = new THREE.MeshBasicMaterial({ alphaTest: 0.001, map: this.resources.items.transferOwnershipIcon, side: THREE.DoubleSide })
    this.items.txPending            = new THREE.MeshStandardMaterial({ color: "orange", transparent: true, opacity: 0.9, metalness: 0.7, roughness: 0.5, toneMapped: false})
    this.items.txValided            = new THREE.MeshStandardMaterial({ color: "green", transparent: true, opacity: 0.9, metalness: 0.7, roughness: 0.5, toneMapped: false})
    this.items.txFailed             = new THREE.MeshStandardMaterial({ color: "red", transparent: true, opacity: 0.9, metalness: 0.7, roughness: 0.5, toneMapped: false})
  
    this.items.portalLightMaterial = new THREE.ShaderMaterial({
      clipping: true,
      uniforms:
      {
          uTime: { value: 0.0 },
          uDisplacement: { value: 0.1 },
          uMulDisplacement: { value: 5.0 },
          uStrength: { value: 0.2 },
          uMulStrength: { value: 5.0 },
          uOuterGlow: { value: 1.4 },
          uMulOuterGlow: { value: 5.0 },
          uFlat: { value: 0.8 },
          uColorStart: { value: new THREE.Color("#ffffff") },
          uColorEnd: { value: new THREE.Color("#910cac") }
      },
      vertexShader: `varying vec2 vUv;

      void main()
      {
          vec4 modelPosition = modelMatrix * vec4(position, 1.0);
          vec4 viewPosition = viewMatrix * modelPosition;
          vec4 projectionPosition = projectionMatrix * viewPosition;
      
          gl_Position = projectionPosition;
      
          vUv = uv;
      }`,
      fragmentShader: `uniform float uTime;
      uniform float uDisplacement;
      uniform float uMulDisplacement;
      uniform float uStrength;
      uniform float uMulStrength;
      uniform float uOuterGlow;
      uniform float uMulOuterGlow;
      uniform float uFlat;
      uniform vec3 uColorStart;
      uniform vec3 uColorEnd;
      uniform float uTest;
      
      varying vec2 vUv;
      
      //    Classic Perlin 3D Noise 
      //    by Stefan Gustavson
      //
      vec4 permute(vec4 x){ return mod(((x*34.0)+1.0)*x, 289.0); }
      vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }
      vec3 fade(vec3 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }
      
      float cnoise(vec3 P)
      {
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
      
      void main()
      {
          // Displace the UV
          vec2 displacedUv = vUv + cnoise(vec3(vUv * uMulDisplacement, uTime * uDisplacement));
      
          // Perlin noise
          float strength = cnoise(vec3(displacedUv * uMulStrength, uTime * uStrength));
      
          // Outer glow
          float outerGlow = distance(vUv, vec2(0.5)) * uMulOuterGlow - uOuterGlow;
          strength += outerGlow;
      
          // Apply cool step
          strength += step(- 0.2, strength) * uFlat;
      
          // Clamp the value from 0 to 1
          //strength = clamp(strength, 0.0, uClamp);
      
          // Final color
          vec3 color = mix(uColorStart, uColorEnd, strength);
      
          gl_FragColor = vec4(color, 1.0);
      }`
  })
  this.items.gotchiBody = new THREE.MeshStandardMaterial({ color: "white", transparent: true, opacity: 0.9, metalness: 0.2, roughness: 0.3, toneMapped: true})

    this.resources.trigger("texturesMapped")
  }
}