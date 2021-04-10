import cameraJSON from '../assets/cameras.json'

export interface Camera {
    x: number,
    y: number,
    url: string
  }

export const cameraData:Camera[] = cameraJSON as Camera[];