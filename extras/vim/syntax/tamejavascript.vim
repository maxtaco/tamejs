runtime! syntax/javascript.vim

syn keyword tameJsKeywords await defer
hi def link tameJsKeywords Statement

syntax cluster javaScriptAll add=tameJsKeywords
