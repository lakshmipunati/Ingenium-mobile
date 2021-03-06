import React from "react";
import { SvgXml } from "react-native-svg";
import {user, contact, lock, hideEye, visibleEye, logout, backArrow, calender, close, downArrow, lookup, barcode, search, anchor} from "./svg"

export const USerIcon=(props)=><SvgXml xml={user} height={props.height} width={props.width} fill={props.fill}/>;

export const ContactIcon=(props)=><SvgXml xml={contact} height={props.height} width={props.width} fill={props.fill}/>;

export const LockIcon=(props)=><SvgXml xml={lock} height={props.height} width={props.width} fill={props.fill}/>

export const HideIcon=(props)=><SvgXml xml={hideEye} height={props.height} width={props.width} fill={props.fill}/>

export const VisibleIcon=(props)=><SvgXml xml={visibleEye} height={props.height} width={props.width} fill={props.fill}/>

export const LogoutIcon=(props)=><SvgXml xml={logout} height={props.height} width={props.width} fill={props.fill}/>

export const BackArrowIcon=(props)=><SvgXml xml={backArrow} height={props.height} width={props.width} fill={props.fill}/>

export const CloseIcon=(props)=><SvgXml xml={close} height={props.height} width={props.width} fill={props.fill}/>

export const DownArrowIcon=(props)=><SvgXml xml={downArrow} height={props.height} width={props.width} fill={props.fill}/>

export const CalenderIcon=(props)=><SvgXml xml={calender} height={props.height} width={props.width} fill={props.fill}/>

export const LookupIcon=(props)=><SvgXml xml={lookup} height={props.height} width={props.width} fill={props.fill}/>

export const BarcodeIcon=(props)=><SvgXml xml={barcode} height={props.height} width={props.width} fill={props.fill}/>

export const SearchIcon=(props)=><SvgXml xml={search} height={props.height} width={props.width} fill={props.fill}/>

export const AnchorIcon=(props)=><SvgXml xml={anchor} height={props.height} width={props.width} fill={props.fill}/>

