import React from "react";
import { SvgXml } from "react-native-svg";
import {user, contact, lock, hideEye, visibleEye, logout, backArrow, calender} from "./svg"

export const USerIcon=(props)=><SvgXml xml={user} height={props.height} width={props.width} fill={props.fill}/>;

export const ContactIcon=(props)=><SvgXml xml={contact} height={props.height} width={props.width} fill={props.fill}/>;

export const LockIcon=(props)=><SvgXml xml={lock} height={props.height} width={props.width} fill={props.fill}/>

export const HideIcon=(props)=><SvgXml xml={hideEye} height={props.height} width={props.width} fill={props.fill}/>

export const VisibleIcon=(props)=><SvgXml xml={visibleEye} height={props.height} width={props.width} fill={props.fill}/>

export const LogoutIcon=(props)=><SvgXml xml={logout} height={props.height} width={props.width} fill={props.fill}/>

export const BackArrowIcon=(props)=><SvgXml xml={backArrow} height={props.height} width={props.width} fill={props.fill}/>


export const CalenderIcon=(props)=><SvgXml xml={calender} height={props.height} width={props.width} fill={props.fill}/>
