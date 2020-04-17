import React from 'react';
export const createMenu = () =>{

    return [
        { label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/dashboard' },
        {
            label: 'Perfil', icon: 'pi pi-fw pi-bars',
            items: [
                {
                    label: 'Dados pessoais',
                    icon: 'pi pi-fw pi-bars',
                    to: '/personal-data'
                },
                {
                    label: 'Dados esportivos',
                    icon: 'pi pi-fw pi-bars',
                    to: '/sports-data'
                },
                {
                    label: 'Dados médicos',
                    icon: 'pi pi-fw pi-bars'
                }
            ]
        },
        {
            label: 'Treinamento', icon: 'pi pi-fw pi-bars',
            items: [
                {
                    label: 'Frequência',
                    icon: 'pi pi-fw pi-bars',
                    to: '/frequency'
                },
                {
                    label: 'Programação',
                    icon: 'pi pi-fw pi-bars',
                    to:'/schedule'
                },
                {
                    label: 'Dados médicos',
                    icon: 'pi pi-fw pi-bars'
                }
            ]
        },
        {
            label: 'Competições', icon: 'pi pi-fw pi-bars',
            items: [
                {
                    label: 'Campeonatos',
                    icon: 'pi pi-fw pi-bars'
                },
                {
                    label: 'Jogos',
                    icon: 'pi pi-fw pi-bars'
                },
                {
                    label: 'Organizadores',
                    icon: 'pi pi-fw pi-bars',
                    to: '/organization'
                },
                {
                    label: 'Equipes',
                    icon: 'pi pi-fw pi-bars',
                    to: '/teams'
                }
            ]
        },
        {
            label: 'Desempenho', icon: 'pi pi-fw pi-bars',
            items: [
                {
                    label: 'Competições',
                    icon: 'pi pi-fw pi-bars'
                },
                {
                    label: 'Treinamentos',
                    icon: 'pi pi-fw pi-bars'
                },
                {
                    label: 'Prontuário',
                    icon: 'pi pi-fw pi-bars'
                }
            ]
        },
        { label: 'Contratos', icon: 'pi pi-fw pi-bars' },
        {
            label: 'Tema', icon: 'pi pi-fw pi-palette',
            items: [
                {
                    label: 'Blue', icon: 'pi pi-fw pi-palette', styleClass: 'blue-theme', command: (event) => {
                        this.changeTheme({ originalEvent: event, theme: 'blue-light' })
                    }
                },
                {
                    label: 'Green', icon: 'pi pi-fw pi-palette', styleClass: 'green-theme', command: (event) => {
                        this.changeTheme({ originalEvent: event, theme: 'green-light' })
                    }
                },
                {
                    label: 'Cyan', icon: 'pi pi-fw pi-palette', styleClass: 'cyan-theme', command: (event) => {
                        this.changeTheme({ originalEvent: event, theme: 'cyan-light' })
                    }
                },
                {
                    label: 'Purple', icon: 'pi pi-fw pi-palette', styleClass: 'purple-theme', command: (event) => {
                        this.changeTheme({ originalEvent: event, theme: 'purple-light' })
                    }
                },
                {
                    label: 'Indigo', icon: 'pi pi-fw pi-palette', styleClass: 'indigo-theme', command: (event) => {
                        this.changeTheme({ originalEvent: event, theme: 'indigo-light' })
                    }
                },
                {
                    label: 'Yellow', icon: 'pi pi-fw pi-palette', styleClass: 'yellow-theme', command: (event) => {
                        this.changeTheme({ originalEvent: event, theme: 'yellow-light' })
                    }
                },
                {
                    label: 'Orange', icon: 'pi pi-fw pi-palette', styleClass: 'orange-theme', command: (event) => {
                        this.changeTheme({ originalEvent: event, theme: 'orange-light' })
                    }
                },
                {
                    label: 'Pink', icon: 'pi pi-fw pi-palette', styleClass: 'pink-theme', command: (event) => {
                        this.changeTheme({ originalEvent: event, theme: 'pink-light' })
                    }
                }

            ]
        },
    ];
}