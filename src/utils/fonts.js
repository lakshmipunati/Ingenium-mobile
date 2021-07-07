import {Dimensions} from "react-native";


const {width, height} = Dimensions.get('screen')

export function proportionalSize(size) {
    let aspectRatioSize = width * height;
    let aspectRatioUnit = aspectRatioSize * 0.00001;
    return parseFloat(size) * 0.1 * aspectRatioUnit;
  }