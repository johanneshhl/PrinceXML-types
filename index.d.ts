// Type definitions for PrinceXMl,
// Project: PrinceXML
// Definitions by: Johannes Hvilsom Larsen - https://github.com/johanneshhl/
// see http://www.princexml.com/doc/javascript/#js-pdf


declare namespace Prince {
    
    /** Enable Prince box tracking */
    var trackBoxes : boolean;
    
    /** Page count can only be accessed after document conversion has finished */
    var pageCount : Number;

    /** function addEventListener("complete", function, false);   */
    export function addEventListener(event: "complete", _function: Function, options?: boolean) : void;

    export function addScriptFunc(name: string, fn: string) : void;

    export function convertToFile(JSON: JSON, outputFileName: string, resources?: ArrayBuffer | string ) : void;

    export function convertToBuffer(JSON: JSON, resources?: ArrayBuffer ) : void;
    
    /** re-run rendition see (https://www.princexml.com/forum/topic/4401/sidenotes-and-layout-driven-styling) */
    export function registerPostLayoutFunc(_function: Function) : void;
}
declare namespace Prince.Log {

    /* write an info message to prince log */
    export function info(message:string) : void;

    /* write an warning message to prince log */
    export function warning(message:string) : void;

    /* write an error message to prince log */
    export function error(message:string) : void;

    /* write an data message to prince log */
    export function data(name:string, value:string) : void;    
}

declare namespace Log {
    
    /* write an info message to prince log */
    export function info(message:string) : void;

    /* write an warning message to prince log */
    export function warning(message:string) : void;

    /* write an error message to prince log */
    export function error(message:string) : void;

    /* write an data message to prince log */
    export function data(name:string, value:string) : void;

}

declare type PDF = {

    /** Font embedding in PDF output. */
    embedFonts : boolean;

    /** Font subset in PDF output. */
    subsetFonts : boolean;
        
    /** Font synthesis of missing bold/italic in PDF output. */
    artificialFonts : boolean;  
    
    /** Compression of PDF output */
    compress : boolean;
    
    /** Encrypt PDF output  */
    encrypt : boolean;
    
    /** Set PDF user password */
    userPassword : string | null | undefined;

    /** Set PDF owner password */
    ownerPassword : string | null | undefined;

    /** Allow printing of PDF output */
    allowPrint : boolean;

    /** Allow modification of PDF output */
    allowModify : boolean;

    /** Allow copying of PDF output */
    allowCopy : boolean;
    
    /** Allow Annotation of PDF output */
    allowAnnotate : boolean;
    
    /** Set encryption key size either 40 or 128 */
    keyBits : 40 | 128;

    /** Loaded external script*/
    script : string | null | undefined;
    
    /** Open action eg. "print" */
    openAction : string;

    /** Page layout : single-page | one-column | two-column-left | two-column-right */
    pageLayout : string;

    /** Page mode : auto | show-bookmarks | fullscreen | show-attachments */
    pageMode : string;

    /** Print scale : auto | none */
    printScaling : "auto" | "none";

    /** Duplex : auto | simplex | duplex-flip-short-edge | duplex-flip-long-edge */
    duplex : "auto" | "simplex" | "duplex-flip-short-edge" | "duplex-flip-long-edge";

    /** Profile : Specify the PDF profile (see http://www.princexml.com/doc/pdf-profiles/#pdf-profiles) to use */
    profile : "PDF/A-1b" | "PDF/A-3b" | "PDF/X-1a:2001" | "PDF/X-1a:2003" | "PDF/X-3:2002" | "PDF/X-3:2003" | "PDF/X-4" | null | undefined

    /** Output intent : Url */
    outputIntent : string;

    /** PDF title */
    title : string;

    /** PDF subject */
    subject : string;
    
    /** PDF author */
    author : string;
    
    /** PDF keywords */
    keywords : string;
    
    /** PDF creator */
    creator : string;

    /** Color option eg.  use-true-black */
    colorOption : string;

    /** Color conversion eg.  none */
    colorConversion : string;
    
    /** Filter resolution default : 96 */
    filterResolution : number;

    /** Pages can only be accessed after document conversion has finished */
    pages : BoxInfo[];

    /**
     * Extra files to the generated PDF, similar to the --attach command-line argument:
     * @argument URL path to file to attach
     * @argument Description Description of the attached file
     */
    attachFile(URL: string, Description?: string) : void;
}


/**
 * BoxInfo Read-only 
 * @property type = Body | Line | ex 
 * @property pageNum = Page number starting from 1
 * @property x cordiant = float 
 * @property y cordiant = float 
 * @property w Width = float
 * @property h Height = float
 * @property text Text = String
 * @property style = CSSStyleDeclaration
 * @property children = [BoxInfoChildren] | null | undefined;
 * @property parent = BoxInfo | null | undefined; 
 * @property element = HTMLElement | null | undefined; 
 */
interface BoxInfo {
    
    /** Type : eg.  "BODY" | "BOX" | "LINE" | "SPAN" | "TEXT";  */
    readonly type : "BODY" | "COLUMN" | "FLEXLINE" | "FOOTNOTES" | "FLOATS" | "BOX" | "LINE" | "SPAN" | "TEXT" | "SVG" | "IMAGE";

    /** Page number starting from 1 */
    readonly pageNum : number;
    
    /** X cordiant : float  */
    readonly x : number;
    
    /** Y cordiant : float  */
    readonly y : number;

    /** Width : float  */
    readonly w : number;

    /** Height : float  */
    readonly h : number;

    /** Margin Bottom : the used value for the bottom margin */
    readonly marginBottom : string | null | undefined;
    
    /** Margin Left : the used value for the left margin */
    readonly marginLeft : string | null | undefined;

    /** Margin Right : the used value for the right margin */
    readonly marginRight : string | null | undefined;

    /** Margin Top : the used value for the top margin */
    readonly marginTop : string | null | undefined;

    /** Float position */
    readonly floatPosition : "TOP" | "BOTTOM" | null | undefined;
    
    /** text : text-element name or null */
    readonly text : string | null | undefined;

    /** pseudo : pseudo-element name or null */
    readonly pseudo : string | null | undefined;

    /** src : URL string for images */
    readonly src : string | null | undefined;

    /** style  : CSS style object for box */
    readonly style  : CSSStyleDeclaration | null | undefined

    /** Box node children : BoxInfoChildren  */
    readonly children : BoxInfoChildren | null | undefined;

    /** Parent Boxinfo */
    readonly parent : BoxInfo | null | undefined;

    /** Self Element */
    readonly element : HTMLElement | null | undefined;
}


interface BoxInfoChildren {

    /**
     * Sets or retrieves the number of objects in a collection.
     */
    readonly length: number;
    /**
     * Retrieves an object from various collections.
     */
    item(index: number): BoxInfo;
    [index: number]: BoxInfo;
}


interface Element {
    /**
     * @returns BoxInfo node/nodes
     */
    getPrinceBoxes() : BoxInfo[];
    readonly parentNode : Element;

}


interface document {
    write() : void;
}

interface window {
    setInterval() : void;
}

declare const PDF : PDF;
