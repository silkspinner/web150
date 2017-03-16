<!DOCTYPE html>
<html>
    <!-- WEB150 WN17 Week 10 */ -->
    <!-- 03/15/2017 Ron Nims -->
    <!-- Assignment - Opensource JS project presentation on underscore.js -->
    <head>
        <link rel="stylesheet" href="community.css" />
        <script src="community.js"></script>    
        <script src="sorttable.js"></script>
        <script src="underscore.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
        <link href="https://fonts.googleapis.com/css?family=Bubblegum+Sans|Merriweather+Sans" rel="stylesheet">
    </head>
    <body>
        <header>
            <div id="logo">
                <a href="http://www.seattle.gov/" target="_blank"><img src="seattle-logo.png" height="70" width="70"></a>
                <h1>Seattle Online Community Organizations</h1>
            </div>
            <p>A live list of Seattle's Online Community groups provided by <a href="https://dev.socrata.com/foundry/data.seattle.gov/y7iv-rz67">data.seattle.gov</a>,
                providing a website link and email contact if available.</p>

        </header>
        <table id="groups" class="sortable">
            <thead>
                <tr class="highlight">
                    <th class="region">Region</th>
                    <th class="hood">Neighborhood</th>
                    <th class="category">Category</th>
                    <th class="name">Group Name</th>
                    <th class="type">Group Type</th>
                    <th class="email">Email</th>
                </tr>
            </thead>
            <tbody id="groupsBody">
                
            <!-- BEGIN: Underscore Template Definition. -->
            <script type="text/template" class="template">

                <% _.each( groupsObj, function( listItem, index ){ %>
                
                    <tr>
                        <td class="region"><%- listItem.region %></td>
                        <td class="hood"><%- listItem.neighborhood %></td>
                        <td class="category"><%- listItem.category %></td>
                        <td class="name"><a href="<%- listItem.url %>"><%- listItem.name %></a></td>
                        <td class="type"><%- listItem.type %></td>
                        <td class="email"><%- listItem.email_contact %></td>
                    </tr>
                    
                <% }); %>

            </script>
                
            </tbody>
        </table>

    <body>
        
    <script>
        $(document).ready(function(){
            processPage();
            //refreshTable();
        });
    </script>        
        
</html> 