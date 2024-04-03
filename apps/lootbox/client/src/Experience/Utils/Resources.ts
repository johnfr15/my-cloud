import * as THREE       from "three";
import EventEmitter     from "./EventEmitter";
import { GLTFLoader }   from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FontLoader }   from "three/examples/jsm/loaders/FontLoader.js";
import { DRACOLoader }  from 'three/examples/jsm/loaders/DRACOLoader'
import PreLoader        from "../PreLoader";
import Experience       from "../Experience";

type Sources = {
  name: string, 
  type: string, 
  path: any
}

type Loaders = {
  fontLoader: FontLoader
  gltfLoader: GLTFLoader
  dracoLoader: DRACOLoader
  textureLoader: THREE.TextureLoader
  imageLoader: THREE.ImageLoader
  cubeTextureLoader: THREE.CubeTextureLoader
  abiLoader: THREE.FileLoader
}

export default class Resources extends EventEmitter {
  experience: Experience
  preloader: PreLoader

  sources: Sources[]
  items: {[key: string]: any}
  loadingManager!: THREE.LoadingManager
  toLoad: number;
  loaded: number = 0
  loaders!: Loaders

  constructor(sources: Sources[]) {
    super()

    this.experience = Experience.Instance()
    this.preloader = this.experience.preLoader


    this.sources = sources
    this.items = {}
    this.toLoad = this.sources.length;

    this.setLoaders()
    this.startLoading()
  }

  setLoaders() {

    this.loaders = {
      fontLoader:         new FontLoader(),
      dracoLoader:        new DRACOLoader(),
      gltfLoader:         new GLTFLoader(),
      textureLoader:      new THREE.TextureLoader(),
      imageLoader:        new THREE.ImageLoader(),
      cubeTextureLoader:  new THREE.CubeTextureLoader(),
      abiLoader:          new THREE.FileLoader()
    }
    
    this.loaders.dracoLoader.setDecoderPath('/draco/')
    this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader)
  }

  startLoading() {
    for (const source of this.sources) {
      if (source.type === "gltfModel")
        this.loaders.gltfLoader.load(source.path, (file: unknown) => this.sourcesLoaded(source, file))
      if (source.type === "lootBoxScene")
        this.loaders.gltfLoader.load(source.path, (file: unknown) => this.sourcesLoaded(source, file))
      if (source.type === "texture")
        this.loaders.textureLoader.load(source.path, (file: unknown) => this.sourcesLoaded(source, file))
      if (source.type === "image")
        this.loaders.textureLoader.load(source.path, (file: unknown) => this.sourcesLoaded(source, file))
      if (source.type === "cubeTexture")
        this.loaders.cubeTextureLoader.load(source.path, (file: unknown) => this.sourcesLoaded(source, file))
      if (source.type === "font")
        this.loaders.fontLoader.load(source.path, (file: unknown) => this.sourcesLoaded(source, file))
      if (source.type === "abi")
        this.loaders.abiLoader.load(source.path, (file: any) => this.sourcesLoaded(source, JSON.parse(file)))
    }
  }

  sourcesLoaded(source: Sources, file: unknown) {
    this.trigger('itemLoaded')
    this.items[source.name] = file
    this.loaded++;

    if (this.loaded === this.toLoad) this.trigger("ready")
  }
}