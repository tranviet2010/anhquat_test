import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  Keyboard,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import MHeader from '../../../components/MHeader';
import MView from '../../../components/MView';
import {
  width,
  COLOR_PRIMARY,
  height,
  TEXT_COLOR,
} from '../../../utilities/config';
import RNLocation from 'react-native-location';
import NButton from '../../../components/NButton';
import Icon from 'react-native-vector-icons/FontAwesome5Pro';
const ic_search = require('../../../assets/img/img_account/ic_search.png');
const ic_times = require('../../../assets/img/img_account/ic_times.png');
import _ from 'lodash';
import OneLine from '../../../components/OneLine';
import {ActivityIndicator} from 'react-native-paper';

export default class PinonMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 20.5,
        longitude: 108,
        latitudeDelta: 0.009,
        longitudeDelta: 0.009,
        ...this.props.route.params.my_location,
      },
      marker: this.props.route.params.my_location,
      location: 'Hello',
      changing_region: true,
      my_address: '',
      address_search: '',
      data_address: [],
      my_location: this.props.route.params.my_location,
    };
    console.log(this.state.region);

    console.log(this.props.route.params.my_location);

    this.onChangeDestinationDebounced = _.debounce(
      () => this.autoCompleteAddress(this.state.address_search),
      500,
    );
  }

  onRegionChangeComplete(region) {
    this.setState({region});
  }

  tracking = async () => {
    var permission = await RNLocation.getCurrentPermission();
    if (permission.includes('authorized')) {
      RNLocation.getLatestLocation({timeout: 60000})
        .then((latestLocation) => {
          var body = {
            longitude: latestLocation.longitude,
            latitude: latestLocation.latitude,
          };
          this.setState({
            region: {
              ...this.state.region,
              ...body,
            },

            marker: body,
          });
          if (this.map) {
            this.map.animateToRegion(region);
          }
        })
        .catch((error) => {});
    } else {
    }
  };
  componentDidMount() {
    if (!this.state.my_location) {
      this.tracking();
    }
  }
  componentDidUpdate(PrevProps, PrevState) {
    // if (PrevState.region != this.state.region) {
    //   if (this.map) {
    //     const reg = this.state.region;
    //     this.getLocation(reg.latitude, reg.longitude);
    //     this.map.animateToRegion(this.state.region);
    //   }
    // }
  }
  getPlace = (id) => {
    fetch(
      'https://maps.googleapis.com/maps/api/place/details/json?&key=AIzaSyAsRTqI2WUAo1LhcEabwK2LQMo0k7FqcIg&placeid=' +
        id,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then((response) => response.json())
      .then((responseJson) => {
        let region = {
          ...this.state.region,
          latitude: responseJson.result.geometry.location.lat,
          longitude: responseJson.result.geometry.location.lng,
        };
        let my_location = {
          latitude: responseJson.result.geometry.location.lat,
          longitude: responseJson.result.geometry.location.lng,
        };
        this.setState(
          {
            data_address: [],
            region,
            my_location,
          },
          () => {
            if (this.map) {
              this.map.animateToRegion(region);
            }
          },
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };
  autoCompleteAddress = (string) => {
    fetch(
      'https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyBfENPOXpbQfCOmnet3FwzlsIOaj8ekYxg&components=country:vn&input=' +
        string,
      // "https://reactnative.dev/movies.json",
      {
        method: 'GET',
      },
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        this.setState({data_address: result.predictions});
      })
      .then((err) => {
        if (err) {
          console.log(err);
        }
      });
  };
  getLocation = (lat, long) => {
    fetch(
      'https://test-livraison.yobuma.com/yobuma_api/getAddressFromLocationAnhQuat?latitude=' +
        lat +
        '&' +
        'longitude=' +
        long,
      // "https://reactnative.dev/movies.json",
      {
        method: 'GET',
      },
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        this.setState({
          my_address: result.data.address,
          changing_region: false,
          is_loading_confirm: false,
          my_location: {
            latitude: lat,
            longitude: long,
          },
        });
      })
      .then((err) => {
        if (err) {
          this.setState({changing_region: false, is_loading_confirm: false});

          console.log(err);
        }
      });
  };
  _view_search() {
    return (
      <View style={styles.view_search_}>
        <Image
          source={ic_search}
          style={{height: 18, width: 40}}
          resizeMode="contain"
        />
        <View style={{flex: 1}}>
          <TextInput
            placeholder={'Tìm kiếm địa chỉ'}
            style={[
              {
                borderColor: this.state.focus ? COLOR_PRIMARY : '#F6F6F6',
              },
            ]}
            onChangeText={(text) => {
              this.setState({address_search: text}, () =>
                this.onChangeDestinationDebounced(),
              );
            }}
            underlineColorAndroid="transparent"
            value={this.state.address_search}
            ref={(ref) => (this.iptext = ref)}
            onFocus={() => {
              this.setState({focus: true});
            }}
            onEndEditing={() => {
              this.setState({focus: false});
            }}
            returnKeyLabel="Tìm"
            returnKeyType={'search'}
            maxLength={100}
            // onSubmitEditing={() => {
            // 	this.onRefresh();
            // }}
          />
        </View>
        {this.state.address_search != '' ? (
          <TouchableOpacity
            onPress={() => {
              this.setState({address_search: ''}, () => {
                this.autoCompleteAddress('');
              });
            }}>
            <Image
              source={ic_times}
              style={{height: 18, width: 40}}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ) : null}
      </View>
    );
  }
  view_item = (item, index) => {
    return (
      <View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            paddingHorizontal: 15,
            paddingVertical: 10,
            backgroundColor: 'white',
          }}
          onPress={() => {
            this.setState({address_search: item.item.description});
            this.getPlace(item.item.place_id);
            Keyboard.dismiss();
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 10,
            }}>
            <Icon name="map-marker-alt" light size={17} color={TEXT_COLOR} />
          </View>
          <View style={{flex: 1}}>
            <Text numberOfLines={1} style={[styles.title, {flex: 1}]}>
              {item.item.description}
            </Text>
            {/* <Text style={styles.text_content} numberOfLines={1}>{item.description}</Text> */}
          </View>
        </TouchableOpacity>
        <OneLine />
      </View>
    );
  };
  render() {
    return (
      <MView>
        <MHeader
          onPress={() => {
            this.props.navigation.pop();
          }}
          text="Chọn trên bản đồ"
        />
        <View style={{flex: 1}}>
          <MapView
            style={styles.map}
            initialRegion={this.state.region}
            region={this.state.region}
            onRegionChangeComplete={(region) =>
              this.onRegionChangeComplete(region)
            }
            onRegionChange={() => {
              if (!this.state.changing_region) {
                this.setState({changing_region: true});
              }
            }}
            ref={(ref) => (this.map = ref)}>
            {/* <Marker
              draggable
              coordinate={this.state.marker}
              onDragEnd={e => alert(JSON.stringify(e.nativeEvent.coordinate))}
              title={"Test Marker"}
              description={"This is a description of the marker"}
            /> */}
          </MapView>
          <View
            style={{
              top: height / 2.7,
              height: width / 6,
              width: width / 1.12,
              borderRadius: 10,
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            <Icon
              style={{
                zIndex: 3,
                alignSelf: 'center',
              }}
              name={'map-marker-alt'}
              solid
              size={40}
              color={COLOR_PRIMARY}
            />
            {/* <MapView
              style={styles.map}
              region={this.state.region}
              onRegionChange={this.onRegionChange.bind(this)}
            ></MapView> */}
          </View>
          {!this.state.changing_region && (
            <View
              elevation={1}
              style={{
                bottom: 100,
                height: 50,
                backgroundColor: 'white',
                width: width * 0.9,
                borderRadius: 10,
                alignSelf: 'center',
                paddingHorizontal: 10,
                paddingVertical: 5,
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
                {this.state.my_address}
              </Text>
            </View>
          )}
          <View style={{position: 'absolute', bottom: 10, width: width}}>
            {!this.state.changing_region && (
              <NButton
                onPress={() => {
                  this.props.route.params.action({
                    my_address: this.state.my_address,
                    my_location: this.state.my_location,
                  });
                  this.props.navigation.pop();
                }}
                text="XÁC NHẬN"
                style={{position: 'absolute', bottom: 10, width: width * 0.9}}
                bgCl={COLOR_PRIMARY}
              />
            )}
          </View>
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: width,
            alignSelf: 'center',
          }}>
          {this.state.changing_region ? (
            <NButton
              onPress={() => {
                this.setState({is_loading_confirm: true, address_search: ''});
                this.getLocation(
                  this.state.region.latitude,
                  this.state.region.longitude,
                );
              }}
              isLoading={this.state.is_loading_confirm}
              text="Đón tôi ở đây"
              style={{marginTop: width / 20}}
              bgCl={COLOR_PRIMARY}
            />
          ) : null}
        </View>
        <View
          style={{
            position: 'absolute',
            top: 100,
            left: 0,
            paddingHorizontal: 15,
            width: width,
          }}>
          {this._view_search()}
          <FlatList
            keyExtractor={(item, index) => index}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            extraData={this.state.data_address}
            data={this.state.data_address}
            renderItem={(item, index) => {
              return this.view_item(item, index);
            }}
          />
        </View>
      </MView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  view_search_: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    width: '100%',
    borderRadius: 4,
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  mview_submit: {borderRadius: 40},
  view_search: {
    borderRadius: 4,
  },
});
