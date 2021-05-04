import React from "react";
import { SvgXml } from "react-native-svg";
import {user, contact, lock} from "./svg"

export const USerIcon=(props)=><SvgXml xml={user} height={props.height} width={props.width} fill={props.fill}/>;

export const ContactIcon=(props)=><SvgXml xml={contact} height={props.height} width={props.width} fill={props.fill}/>;

export const LockIcon=(props)=><SvgXml xml={lock} height={props.height} width={props.width} fill={props.fill}/>

