import cameraJSON from '../assets/cameras.json'

export interface camera {
    x: number,
    y: number,
    url: string
  }

export const cameraData:camera[] = cameraJSON as camera[];