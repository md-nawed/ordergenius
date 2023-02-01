using OrderGeniusWebApp.Models;
using Sitecore.ContentSearch;
using Sitecore.ContentSearch.SearchTypes;
using Sitecore.LayoutService.Configuration;
using Sitecore.LayoutService.ItemRendering.ContentsResolvers;
using Sitecore.Mvc.Presentation;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using Sitecore.Data;
using Sitecore.Data.Fields;

namespace OrderGeniusWebApp.Resolvers
{
    public class HeaderMenuResolver : IRenderingContentsResolver
    {
        public bool IncludeServerUrlInMediaUrls { get; set; }
        public bool UseContextItem { get; set; }
        public string ItemSelectorQuery { get; set; }
        public NameValueCollection Parameters { get; set; }

        public object ResolveContents(Rendering rendering, IRenderingConfiguration renderingConfig)
        {
            var database = Sitecore.Context.Database;
            using (var context = ContentSearchManager.GetIndex("sitecore_master_index").CreateSearchContext())
            {
                var items = context.GetQueryable<SearchResultItem>().Where(x => x.TemplateId == new ID("{FB9D57A9-DABA-4701-B41E-D938F5780D8E}"));
                List<HeaderMenuResponse> list = new List<HeaderMenuResponse>();
           
                foreach(var i in items)
                {
                    var item = database.GetItem(new ID((string)i.Fields["itemid"]));
                    LinkField link = item.Fields["LinkUrl"];
                    list.Add(new HeaderMenuResponse { Text = (string)i.Fields["linktext"], Url = link.Url });
                }

                return new { list };
            }
        }
    }
}