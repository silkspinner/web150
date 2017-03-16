<!DOCTYPE html>
<html>
    <!-- WEB150 WN17 Week 10 */ -->
    <!-- 03/15/2017 Ron Nims -->
    <!-- Assignment - Opensource JS project presentation on underscore.js -->
    <head>
        <link rel="stylesheet" href="community.css" />
        <script src="community.js"></script>    
        <script src="underscore.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
        <link href="https://fonts.googleapis.com/css?family=Bubblegum+Sans|Merriweather+Sans" rel="stylesheet">
    </head>
    <body>
        <h1>Seattle Online Community Organizations</h1>
        <p>A list of Seattle's Online Community groups provided by <a href="https://dev.socrata.com/foundry/data.seattle.gov/y7iv-rz67">data.seattle.gov</a>,
            providing an email contact and website link if available.</p>
        <hr>
       
        <table id="groups">
            <thead>
                <tr>
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

                <% _.each( groupsObj, function( listItem ){ %>
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
            refreshTable();
        });
    </script>        
        
</html> 