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

* [`DocList`](#component-doclist) (path: `/`): Listado de Documentos
    - [`Navbar`](#component-navbar)
        + `title`: Writings
        + `menu[]`
            * `title`: Settings
            * `onClick`: Ir a la url `/settings`
    - [`DocItem[]`](#component-docitem)
* [`DocEditor`](#component-doceditor) (path: `/p/:docKey`): Documento
    - [`Navbar`](#component-navbar)
        + `title`: `doc.title`
        + `onClickBack`: Ir a la url `/`
    - [`TextEditor`](#component-texteditor)
        + `value`: `doc.content`
    - _if_ `selected.word`
        + [`PreviewWordInspect`](#component-previewwordinspect)
            * `word`: selected.word
* [`Settings`](#component-settings) (path: `/settings`): Configuraciones
    - [`Navbar`](#component-navbar)
        + `title`: Settings
        + `onClickBack`: Ir a la url `/`
* [`WordInspect`](#component-wordinspect) (path: `/w/:wordKey`)
    - [`Navbar`](#component-navbar)
        + `onClickBack`: Ir a la url `/p/:docKey`
        + `title`: `word.title`
    - `content`

### Componentes

* [DocList](#component-doclist)
* [DocEditor](#component-doceditor)
* [Settings](#component-settings)
* [WordInspect](#component-wordinspect)
* [Navbar](#component-navbar)
* [DocItem](#component-docitem)
* [TextEditor](#component-texteditor)
* [PreviewWordInspect](#component-previewwordinspect)

<a name="component-doclist"></a>
#### Componente Pagina `DocList` Muestra un listado con todos los documentos creados

__Propiedades__

* `docs` (`object.<id,`[`Doc`](#type-doc)`>`)

__Ejemplo__

```
const routeDocList = <Route path="/" componente={DocList}></Route>
```



<a name="component-doceditor"></a>
#### Componente Pagina `DocEditor` Esta pagina visualiza/edita una documento

__Propiedades__

* `doc` ([Doc](#type-doc))

__Ejemplo__

```
const routeDocEditor = <Route path="/p/:docId" componente={DocEditor}></Route>
```


<a name="component-settings"></a>
#### Componente Pagina `Settings` Muestra las configuraciones de la aplicación

__Propiedades__

* `settings` (`Array`<[`Setting`](#type-setting)>)

__Ejemplo__

```
const routeSettings = <Route path="/settings" componente={Settings}></Route>
```


<a name="component-wordinspect"></a>
#### Componente Pagina `WordInspect` Muestra la definición de una palabra

__Propiedades__

* `word` ([`Word`](#type-word))

__Ejemplo__

```
const routeWordInspect = <Route path="/w/:data" componente={WordInspect}></Route>
```


<a name="component-navbar"></a>
#### Componente `Navbar`

__Propiedades__

* `title` (`string`)
* `onClickBack` (`function`)
* `menu` (`Array[[title: string, onClick: function]]`)

__Ejemplo__

```
const navbar = <Navbar title={title} onClickBack={handleOnClickBack} menu={menu}/>
```


<a name="component-docitem"></a>
#### Componente `DocItem`

__Propiedades__

* `title` (`string`)
* `lastEdit` (`date`)
* `onClick` (`function`)

__Ejemplo__

```
const docItem = <DocItem title={doc.title} lastEdit={doc.lastEdit} onClick={handleOnClick}/>
```


<a name="component-texteditor"></a>
#### Componente `TextEditor`
Edita un texto y muestra palabras que coincidan con una coincidencia de palabras.

__Propiedades__

* `value` (`string`)

__Ejemplo__

```
const textEditor = <TextEditor value={value}/>
```


<a name="component-previewwordinspect"></a>
#### Componente `PreviewWordInspect`

Muestra una breve descripción de una palabra.

__Propiedades__

* `word` (`string`)

__Ejemplo__

```
const previewWordInspect = <PreviewWordInspect word={word}/>
```



