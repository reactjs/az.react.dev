---
title: Xüsusi Proplar Xəbərdarlığı
layout: single
permalink: warnings/special-props.html
---

JSX elementində olan propların əksəriyyəti komponentə göndərilir. Lakin, React tərəfindən işlədilən iki xüsusi prop (`ref` və `key`) komponentə yönləndirilmir.

Məsələn, komponentdən `this.props.key`-i oxumaq (i.e., render funksiyası və ya [propTypes-dan](/docs/typechecking-with-proptypes.html#proptypes)) təyin edilməyib. Əgər sizə eyni dəyəri uşaq komponentdən oxumaq lazımdırsa bu dəyəri komponentə digər prop ilə (məsələn: `<ListItemWrapper key={result.id} id={result.id} />`) göndərin. Bunun lazımsız görünməsinə baxmayaraq, applikasiya məntiqini rekonsilyasiya işarələrindən ayırmaq vacibdir.
