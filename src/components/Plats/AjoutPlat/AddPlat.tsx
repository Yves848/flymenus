import * as React from 'react';
import {
  Button,
  InputGroup,
  FormGroup,
  MenuItem,
  Dialog,
  Classes,
  Spinner,
} from '@blueprintjs/core';

import { Select } from '@blueprintjs/select';
import axios from 'axios';
//import ImageGrid from '../../Display/ImageGrid';
import {categories} from '../../config/categories';
import noImage from '../../../assets/images/No-image-available.jpg';


export interface AddPlatProps {
  isOpen: boolean;
  Plat: any;
  Mode: number;
  index: number;
  handleClose(): void;
  handleAjout(plat: any, index: number): void;
}

export interface AddPlatState {}


let si: any;
class AddPlat extends React.Component<AddPlatProps, AddPlatState> {
  constructor(props: any) {
    super(props);
  }
  state = {
    isOpen: false,
    categorie: '',
    plat: {
      Nom: '',
      Image: '',
      Categorie: '',
    },
    images: [noImage],
    loading: false,
    imgIndex: 0
  };

  componentWillUpdate(nextProps: any, nextState: any) {
    if (nextProps.isOpen !== this.props.isOpen) {
      let newState:any;

      if (nextProps.Mode === 1) {
        newState = {
          plat: {
            Nom: nextProps.Plat.Nom,
            Image: nextProps.Plat.Image,
            Categorie: nextProps.Plat.Categorie,
          },
          categorie: nextProps.Plat.Categorie,
          images: [nextProps.Plat.Image],
          imgIndex: 0,
          isOpen: nextProps.isOpen,
        };
      } else {
        newState = {
          plat: {
            Nom: '',
            Image: '',
            Categorie: '',
          },
          categorie: '',
          images: [noImage],
          imgIndex: 0,
          isOpen: nextProps.isOpen,
        };
      }

      if (nextProps.isOpen) {
        this.setState({
          ...newState,
        });
        if (nextProps.Mode === 1) {
        this.searchImage(nextProps.Plat.Nom, 0)
          .then(images => {
            let idx = images.indexOf(nextProps.Plat.Image);
            let tmpImg;
            if (idx === -1) {
              tmpImg = images.splice(0,0,nextProps.Plat.Image);
              idx = 0;
            }
            else {
              tmpImg = images;
            }
            
            
            this.setState({
                images: tmpImg,
                loading: false,
                imgIndex: idx
            });
          })
          .catch(error => {
            console.error(error);
          });
        }
      } else {
        this.setState({
          isOpen: nextProps.isOpen,
        });
      }
    }
  }

  handleNomChange = (event: any) => {
    clearTimeout(si);
    const nom = event.target.value;
    const plat = this.state.plat;
    this.setState({
      plat: {
        ...plat,
        Nom: nom,
        imgIndex: 0
      },
    });
    si = setTimeout(() => {
      this.searchImage(nom.toString(), 0)
        .then(images => {
          this.setState({
            images: images,
            loading: false,
          });
        })
        .catch(error => {
          console.error(error);
        });
    }, 800);
  };

  handleCategorieChange = (event: any) => {
    const plat = this.state.plat;
    this.setState({
      plat: {
        ...plat,
        Categorie: event.target.value,
      },
    });
  };

  searchImage = (key: string, page: number) => {
    return new Promise<Array<any>>((resolve, reject) => {
      var CSE_API_KEY = '007439388879951561867:3ragl0fkhpm';
      var CSE_ID = 'AIzaSyDYvQx76ZvFawwKOaDeGqRClb2RJlIcsXM';

      var parameters = '?q=' + encodeURIComponent(key);
      parameters += '&cx=' + CSE_API_KEY;
      parameters += '&imgSize=large';
      parameters += '&searchType=image';
      parameters += '&key=' + CSE_ID;
      parameters += '&lr=lang_fr';
      parameters += '&start=1';

      var path = 'https://www.googleapis.com/customsearch/v1' + parameters;
      this.setState({
        loading: true,
      });
      var images: Array<any> = [];
      axios
        .get(path)
        .then(response => {
          var result: Array<any> = response.data.items;
          if (result) {
            result.forEach(image => {
              images.push(image.link);
            });
          } else {
            images.push(noImage);
          }
          resolve(images);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  itemRenderer = (item: any, { handleClick }: any) => {
    return (
      <div key={item.index} className="row" style={{ marginLeft: '5px' }}>
        
        <div className="col">
          <MenuItem text={item.nom} onClick={handleClick} shouldDismissPopover={true} />
        </div>
      </div>
    );
  };

  handleclick = (item: any) => {
    const plat = this.state.plat;
    this.setState({
      categorie: item.nom,
      plat: {
        ...plat,
        Categorie: item.nom,
      },
    });
  };

  changeImage = (direction: number) => {
    let imgIndex = this.state.imgIndex;
    if (direction === 0) {
      imgIndex = imgIndex - 1 < 0 ? this.state.images.length - 1 : imgIndex - 1;
    } else {
      imgIndex = imgIndex + 1 > this.state.images.length - 1 ? 0 : imgIndex + 1;
    }
    this.setState({
      imgIndex: imgIndex,
    });
  };

  handleAjout = () => {
    const plat = this.state.plat;

    if (this.state.images.length > 1) {
      plat.Image = this.state.images[this.state.imgIndex];
    } else {
      plat.Image = '';
    }
    
    this.props.handleAjout(plat, this.props.index);
  };

  render() {
    const { isOpen, plat, loading, imgIndex, images } = this.state;
    const { categorie } = this.state;

    const imgLength = images.length;
    let footer = null;
    if (imgLength > 1) {
      footer = (
        <div>
          <Button
            icon="arrow-left"
            onClick={() => {
              this.changeImage(0);
            }}
          />
          <Button
            icon="arrow-right"
            onClick={() => {
              this.changeImage(1);
            }}
          />
        </div>
      );
    };

    const image = this.state.images[imgIndex];

    if (isOpen) {
    }
    return (
      <Dialog
        isOpen={isOpen}
        onClose={this.props.handleClose}
        title={this.props.Mode === 0 ? "Ajout d'un plat" : `Edition de ${this.state.plat.Nom}`}
        canOutsideClickClose={false}
        style={{ maxWidth: '80%', width: '640px' }}
      >
        <div className={Classes.DIALOG_BODY}>
          <div className="row">
            <div className="col-sm-6 col-lg-4">
              {loading ? (
                <div
                  className="bp3-card bp3-elevation-4"
                  style={{
                    textAlign: 'center',
                    height: '150px',
                  }}
                >
                  <h3>Recherche</h3>
                  <Spinner size={65} />
                </div>
              ) : (
                <div
                  className="bp3-card bp3-elevation-4"
                  style={{
                    textAlign: 'center',
                    height: '150px',
                  }}
                >
                  <img
                    src={image}
                    alt=""
                    style={{ width: '100%', maxHeight: '115px', height: '115px' }}
                  />
                  {footer}
                </div>
              )}
            </div>
            <div className="col-sm-6 col-lg-8">
              <FormGroup label="Nom du plat" labelFor="Nom" labelInfo="(obligatoire)">
                <InputGroup
                  id="Nom"
                  onChange={this.handleNomChange}
                  placeholder=""
                  value={plat.Nom}
                />
              </FormGroup>
              <FormGroup label="Catégorie" labelFor="Categorie" labelInfo="">
                <Select
                  items={categories}
                  filterable={false}
                  itemRenderer={this.itemRenderer}
                  onItemSelect={this.handleclick}
                >
                  <Button
                    text={categorie ? categorie : 'Choisir une catégorie'}
                    rightIcon="caret-down"
                  />
                </Select>
              </FormGroup>
            </div>
          </div>
        </div>

        <div className={Classes.DIALOG_FOOTER} style={{marginTop: "7px"}}>
          <div className="row between-lg between-sm">
            <div className="col">
              <Button
                className={Classes.INTENT_SUCCESS}
                onClick={() => this.handleAjout()}
              >
                Enregistrer
              </Button>
            </div>
            <div className="col">
              <Button
                className={Classes.INTENT_WARNING}
                style={{ margin: '10px' }}
                onClick={() => this.props.handleClose()}
              >
                Annuler
              </Button>
            </div>
          </div>
        </div>
      </Dialog>
    );
  }
}

export default AddPlat;
