# ROADMAP

## Definición

Un editor de texto que desglosa todas las palabras usadas en un texto y mostrando las alternativas a como la misma palabra se escribe y así aportar a la ortografía d el usuario enseñando a escribir correctamente cada palabra.

Esta plataforma mostrara una interfaz web en donde el usuario podrá escribir un texto en el cual se mostraran mientras el escribe las posibles formas de escribir la palabra escrita.

> Todas las palabras usadas serán escaneadas desde el sitio web <http://www.como-se-escribe.com>.

### Funcionamiento

El usuario ingresara a sitio web, en el podrá ver un cuadro de texto, en este cuadro de texto el usuario deberá escribir un texto. a continuación se procesara el texto buscando las palabras que será usadas para mostrar sus opciones.

### Objetivos del proyecto

Servir como una herramienta para aquellas personas que desean mejorar su ortografía.

## Tareas para el proceso del proyecto

- [x] Diseñar interfaz para la aplicación
- [ ] Definir arquitectura de software: Como sera que se programara en esta aplicación
- [ ] Programar UI del sistema
- [ ] Programar lógica de la aplicación
    - [ ] Buscador encargado de escanear las palabras
- [ ] Publicar en github

### Estructura de base de datos

- `words` (`object`)
    + `urls` (`object<id,`[`Word`](#type-word)`>`)
    + `indexSearch` (`Array[[word, id]]`)
        * `word` (`string`)
        * `id` (`string`)
- `docs` (`object.<id,`[`Doc`](#type-doc)`>`)

<a name="type-word"></a>
#### `Word` Type

__Propiedades__

* `id` (`string`)
* `url` (`string`)
* `_context` (`object`)
* `_pulled` (`boolean`)


<a name="type-doc"></a>
#### `Doc` Type

__Propiedades__

* `id` (`string`)
* `title` (`string`)
* `lastEdit` (`Date`)
* `content` (`string`)


<a name="type-setting"></a>
#### `Setting` Type

__Propiedades__
* `id` (`string`)
* `systemScoppe` (`"local"`||`"account"`)
* `type` (`string`)
* `value` (`any`)
* `options` (`Array<string>`)


### Árbol de componentes

> __Componentes por Pagina__

* [`DocList`](#component-doclist) (path: `/`): Listado de Documentos
    - [`Navbar`](#component-navbar)
        + `title`: Writings
        + `menu[]`
            * `title`: Settings
            * `onClick`: Go to `/settings` url.
    - [`DocItem[]`](#component-docitem)
* [`DocEditor`](#component-doceditor) (path: `/p/:docKey`): Documento
    - [`Navbar`](#component-navbar)
        + `onClickBack`: go to `/` url
        + `title`: `doc.title`
    - [`TextEditor`](#component-texteditor)
        + `value`: `doc.content`
        + [`PreviewWordInspect`](#component-previewwordinspect)
* [`Settings`](#component-settings) (path: `/settings`): Configuraciones
    - [`Navbar`](#component-navbar)
        + `onClickBack`: go to `/` url
* [`WordInspect`](#component-wordinspect) (path: `/w/:wordKey`)
    - [`Navbar`](#component-navbar)
        + `onClickBack`: go to `/p/:docKey` url
        + `title`: `word`
    - `content`: `word.spec`

### Componentes

* [DocList](#component-doclist)
* [DocEditor](#component-doceditor)
* [Settings](#component-settings)
* [WordInspect](#component-wordinspect)
* [Navbar](#component-navbar)
* [DocItem](#component-docitem)
* [PreviewWordInspect](#component-previewwordinspect)
* [TextEditor](#component-texteditor)

<a name="component-doclist"></a>
#### Componente Pagina `DocList` Muestra un listado con todos los documentos creados

__Propiedades__

* `docs` (`object.<id,`[`Doc`](#type-doc)`>`)

<a name="component-doceditor"></a>
#### Componente Pagina `DocEditor` Esta pagina visualiza/edita una documento

__Propiedades__

* `doc` ([Doc](#type-doc))


<a name="component-settings"></a>
#### Componente Pagina `Settings` Muestra las configuraciones de la aplicación

__Propiedades__

* `settings` (`Array`<[`Setting`](#type-setting)>)

<a name="component-wordinspect"></a>
#### Componente Pagina `WordInspect` Muestra la definición de una palabra

__Propiedades__

* `word` ([`Word`](#type-word))

<a name="component-navbar"></a>
#### Componente `Navbar`

__Propiedades__

* `title` (`string`)
* `onClickBack` (`function`)
* `menu` (`Array[[title: string, onClick: function]]`)

<a name="component-docitem"></a>
#### Componente `DocItem`

__Propiedades__

* `title` (`string`)
* `lastEdit` (`date`)
* `onClick` (`function`)