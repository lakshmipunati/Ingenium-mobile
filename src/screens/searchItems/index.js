import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList } from "react-native";
import { useDispatch } from "react-redux";
import { BackArrowIcon } from "../../assets";
import { selectedTypeUpdate, triggerSearchItem } from "../../redux";

export function SearchItems(props) {
    const { params } = props.route;

    const [isSearching, setIsSearching] = useState(false);
    const [searchResultList, setSearchResultList] = useState([])
    const [searchValue, setSearchValueResult] = useState(params.value)

    const dispatch = useDispatch();

    useEffect(() => {
        if (params.value != null || params.value != "") {
            _handleOnchangeText(params.value)
        }
    }, [params])

    const _handleOnchangeText = (value) => {
        setIsSearching(true);
        setSearchValueResult(value)
        setTimeout(() => {
            if (value) {
                if (value.trim() !== "") {
                    dispatch(triggerSearchItem({ type: params.title, text: value, isUdfField: params.isUdfField })).then(({ payload }) => {
                        if (payload && !params.isUdfField && payload.searchResultList) {
                            let locationFilterList = payload.searchResultList.filter((e) => {
                                return (e.key.toLowerCase().includes(value.toLowerCase()))
                            })
                            setSearchResultList(locationFilterList)
                        } else if (params.isUdfField && params.udfList) {
                            let udfFilterList = params.udfList.filter((e) => {
                                return (e.label.toLowerCase().includes(value.toLowerCase()))
                            })
                            setSearchResultList(udfFilterList)
                        }
                        else if (payload && payload.searchResultList) {
                            setSearchResultList(payload.searchResultList)
                        } else {
                            setSearchResultList([])
                        }
                    })
                }
            } else {
                setSearchResultList([])
            }
            setIsSearching(false);
        }, 1000);
    }
    const handleSelectItem = (title, type) => {
        dispatch(selectedTypeUpdate({ title, type, isUdfField: params.isUdfField })).then(({ payload }) => {
            props.navigation.navigate('Root')
        })
    }
    const Item = ({ title }) => (
        <TouchableOpacity style={styles.listCell} onPress={() => handleSelectItem(title, params.title)}>
            <Text style={styles.listCellText}>
                {title}
            </Text>
        </TouchableOpacity>
    );

    const renderItem = ({ item }) => {
        if (params.isUdfField) {
          return (<Item title={item.label} />)
        } else {
           return (<Item title={item.key} />)
        }

    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Root')}>
                        <BackArrowIcon width="50px" height="20px" fill="black" />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.headerText}>Search {params.title}</Text>
                    </View>
                </View>
            </View>
            <View>
                <View>
                    <TextInput
                        style={styles.searchBox}
                        value={searchValue}
                        onChangeText={(value) => _handleOnchangeText(value)}
                        placeholder={`Search ${params.title}`}
                    />
                </View>
                <View style={styles.searchContainer}>
                    {isSearching ?
                        <Text style={styles.searchLabel}>Searching...</Text>
                        :
                        searchResultList && searchResultList.length > 0 ? (
                            <FlatList
                                data={searchResultList}
                                renderItem={renderItem}
                            />
                        ) : null
                    }

                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerText: {
        textAlign: 'center',
        paddingRight: 50,
        fontWeight: 'bold',
        fontSize: 18
    },
    header: {
        backgroundColor: '#F8F8F8',
        justifyContent: 'center',
        paddingTop: 50,
        paddingBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        marginBottom: 10,
        elevation: 2,
        position: 'relative'
    },
    searchBox: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        fontSize: 16,
        textTransform:'uppercase'
    },
    searchLabel: {
        paddingLeft: 20,
        paddingTop: 20,
        fontSize: 16
    },
    listCell: {
        padding: 5,
        paddingTop: 10,
        paddingBottom: 10,
        borderWidth: 0.3,
        borderColor: '#ccc',
    },
    listCellText: {
        fontSize: 18
    }
})